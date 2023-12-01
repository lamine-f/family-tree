package com.fayefamily.persistance.services.node;

import com.fayefamily.persistance.dto.NodeDTO;
import com.fayefamily.persistance.enties.Node;
import com.fayefamily.persistance.enties.Relation;
import com.fayefamily.persistance.enties.User;
import com.fayefamily.persistance.enums.FamilyType;
import com.fayefamily.persistance.enums.Gender;
import com.fayefamily.persistance.enums.RelType;
import com.fayefamily.persistance.exceptions.NodeDoesNotExistException;
import com.fayefamily.persistance.exceptions.RelationNotExistException;
import com.fayefamily.persistance.exceptions.SelfRelationNotPermittedExecption;
import com.fayefamily.persistance.exceptions.UserDoesNotExistException;
import com.fayefamily.persistance.repositories.NodeRepository;
import com.fayefamily.persistance.repositories.RelationRepository;
import com.fayefamily.persistance.services.user.ServiceUser;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Stream;

@Service
public class ServiceNodeImp implements ServiceNode{


    private NodeRepository nodeRepository;
    private RelationRepository relationRepository;
    private ServiceUser serviceUser;

    @Lazy
    public ServiceNodeImp(
            ServiceUser serviceUser,
            NodeRepository nodeRepository,
            RelationRepository relationRepository
    ) {
        this.serviceUser = serviceUser;
        this.nodeRepository = nodeRepository;
        this.relationRepository = relationRepository;
    }

    @Override
    public Node toUser(NodeDTO nodeDTO) throws UserDoesNotExistException {
        Node node = new Node();
        node.setId( this.serviceUser.getUser( Integer.valueOf(nodeDTO.getId()) ) );
        node.setChildren(nodeDTO.getChildren());
        node.setGender(nodeDTO.getGender());
        node.setParents(nodeDTO.getParents());
        node.setSiblings(nodeDTO.getSiblings());
        node.setSpouses(nodeDTO.getSpouses());

        return node;
    }

    @Override
    public NodeDTO toDto(Node node) throws UserDoesNotExistException {
        NodeDTO nodeDto = new NodeDTO();
        if (node.getId() == null) throw new UserDoesNotExistException("user does not exist");
        nodeDto.setId( node.getId().getId().toString() );
        nodeDto.setChildren(node.getChildren());
        nodeDto.setGender(node.getGender());
        nodeDto.setParents(node.getParents());
        nodeDto.setSiblings(node.getSiblings());
        nodeDto.setSpouses(node.getSpouses());
        return nodeDto;
    }


    @Override
    public Node addNode(NodeDTO nodeDTO) throws UserDoesNotExistException {
        if (nodeDTO.getId() == null) throw new UserDoesNotExistException("user does not exist");
        Node node = this.toUser(nodeDTO);
        return nodeRepository.save(node);
    }

    private Node deleteAllRelation ( Node node, List<Relation> relations, FamilyType familyType) throws RelationNotExistException, NodeDoesNotExistException, SelfRelationNotPermittedExecption, UserDoesNotExistException {
        if ( !relations.isEmpty() )
            for ( int i=0; i<relations.size(); i++ ) {
                Relation relation = relations.get(i);
                node = this.deleteRelation( node.getId().getId(), relation, familyType );
            }
        return node;
    }

    @Override
    public Node deleteNode(NodeDTO nodeDTO) throws UserDoesNotExistException, NodeDoesNotExistException, RelationNotExistException, SelfRelationNotPermittedExecption {
        Node node = deleteRelations(nodeDTO);
        this.nodeRepository.delete(node);
        return node;
    }

    @Override
    public Node deleteRelation(Integer userId, Relation relation, FamilyType type) throws UserDoesNotExistException, NodeDoesNotExistException, SelfRelationNotPermittedExecption, RelationNotExistException {
        User user = serviceUser.getUser(userId);
        Node node = this.nodeRepository.findNodeById(user);
        if (node == null) throw new NodeDoesNotExistException("node does not exist");

        User otherUser = serviceUser.getUser(Integer.valueOf(relation.getId()));
        Node otherNode = this.nodeRepository.findNodeById(otherUser);
        if (otherNode == null) throw new NodeDoesNotExistException("node does not exist");

        if ( user.getId() == otherUser.getId() ) throw new SelfRelationNotPermittedExecption("self relation not permitted");

        //0 => same & -1 => !

        if ( type.compareTo( FamilyType.spouse ) == 0 ) {
            List<Relation> spouses = node.getSpouses();
            Relation realRelation = spouses.stream().filter(relation1 -> {
                return (relation1.getType().compareTo( RelType.married ) == 0) && (relation1.getId().equals( otherUser.getId().toString()) );
            }).toList().get(0);
            if ( !spouses.remove( realRelation ) ) throw new RelationNotExistException("Spouse relation not exist");
            node.setSpouses(spouses);

            List<Relation> otherSpouses = otherNode.getSpouses();
            Relation otherRelation = otherSpouses.stream().filter(relation1 -> {
                return (relation1.getType().compareTo( RelType.married ) == 0) && (relation1.getId().equals( user.getId().toString()) );
            }).toList().get(0);

            if ( !otherSpouses.remove(otherRelation) ) throw new RelationNotExistException("The other spouse relation not exist");
            otherNode.setSpouses(otherSpouses);
            this.nodeRepository.save(otherNode);
            this.relationRepository.delete(otherRelation);
        }

        if ( type.compareTo( FamilyType.child ) == 0 ) {
            List<Relation> children = node.getChildren();
            Relation realRelation = children.stream().filter(relation1 -> {
                return (relation1.getType().compareTo( RelType.blood ) == 0) && (relation1.getId().equals( otherUser.getId().toString()) );
            }).toList().get(0);

            if ( !children.remove(realRelation) ) throw new RelationNotExistException("Child relation not exist");
            node.setChildren(children);

            List<Relation> parents = otherNode.getParents();
            Relation otherRelation = parents.stream().filter(relation1 -> {
                return (relation1.getType().compareTo( RelType.blood ) == 0) && (relation1.getId().equals( user.getId().toString()) );
            }).toList().get(0);


            if ( !parents.remove(otherRelation) ) throw new RelationNotExistException("The other child relation not exist");
            otherNode.setParents(parents);
            this.nodeRepository.save(otherNode);
            this.relationRepository.delete(otherRelation);
        }

        this.relationRepository.delete(relation);
        return this.nodeRepository.save(node);
    }

    @Override
    public Node deleteRelations(NodeDTO nodeDTO) throws UserDoesNotExistException, NodeDoesNotExistException, SelfRelationNotPermittedExecption, RelationNotExistException {

        Node node = this.getNode( Integer.valueOf(nodeDTO.getId()) );

        node = this.deleteAllRelation(node, node.getSpouses(), FamilyType.spouse);
        node = this.deleteAllRelation(node, node.getChildren(), FamilyType.child);
        node = this.deleteAllRelation(node, node.getParents(), FamilyType.parent);

        return node;
    }

    @Override
    public Node addRelation(Integer userId, Relation relation, FamilyType type) throws UserDoesNotExistException, NodeDoesNotExistException, SelfRelationNotPermittedExecption {

        User user = serviceUser.getUser(userId);
        Node node = this.nodeRepository.findNodeById(user);
        if (node == null) throw new NodeDoesNotExistException("node does not exist");

        Integer otherUserId = Integer.valueOf(relation.getId());
        User otherUser = serviceUser.getUser(otherUserId);
        Node otherNode = this.nodeRepository.findNodeById(otherUser);
        if (otherNode == null) throw new NodeDoesNotExistException("node does not exist");

        if ( user.getId() == otherUser.getId() ) throw new SelfRelationNotPermittedExecption("self relation not permitted");

        //0 => same & -1 => !

        if ( type.compareTo( FamilyType.spouse ) == 0 ) {
            List<Relation> spouses = node.getSpouses();
            spouses.add(relation);
            node.setSpouses(spouses);

            List<Relation> otherSpouses = otherNode.getSpouses();
            Relation otherRelation = new Relation();
            otherRelation.setId( user.getId().toString() );
            otherRelation.setType( relation.getType() );
            otherSpouses.add(otherRelation);
            otherNode.setSpouses(otherSpouses);
            this.nodeRepository.save(otherNode);
        }

        if ( type.compareTo( FamilyType.child ) == 0 ) {
            List<Relation> children = node.getChildren();
            children.add(relation);
            node.setChildren(children);

            List<Relation> parents = otherNode.getParents();
            Relation otherRelation = new Relation();
            otherRelation.setId( user.getId().toString() );
            otherRelation.setType( relation.getType() );
            parents.add(otherRelation);
            otherNode.setParents(parents);
            this.nodeRepository.save(otherNode);
        }


        return this.nodeRepository.save(node);
    }

    private List<HashMap<String, Object>> getRelWithUser (List<Relation> relationList, FamilyType type ) throws UserDoesNotExistException {

        List<HashMap<String, Object>> response = new ArrayList<>();

        for (int i=0; i<relationList.size(); i++) {
            Relation relation = relationList.get(i);
            Integer relUserId = Integer.valueOf(relation.getId());
            User relUser = this.serviceUser.getUser(relUserId);

            HashMap<String, Object> relWithUser = new HashMap<>();

            relWithUser.put(
                    "user",
                    relUser
            );
            relWithUser.put(
                    "relation",
                    relation
            );
            relWithUser.put(
                    "type",
                    type
            );
            response.add(relWithUser);
        }

        return response;
    }

    @Override
    public List<HashMap<String, Object>> getRelations(Integer userId) throws UserDoesNotExistException {
        User user = this.serviceUser.getUser(userId);
        Node node = user.getNode();

        List<HashMap<String, Object>> response = new ArrayList<>();

        response.addAll(
                this.getRelWithUser(node.getParents(), FamilyType.parent)
        );

        response.addAll(
                this.getRelWithUser(node.getChildren(), FamilyType.child)
        );

        response.addAll(
                this.getRelWithUser(node.getSpouses(), FamilyType.spouse)
        );

        return response;
    }

    public Node getNode (Integer id) throws NodeDoesNotExistException {
        Node node = nodeRepository.findNodeByIdNode(id);
        if (node == null) throw new NodeDoesNotExistException("Node does not exist");
        return node;
    }
    @Override
    public List<Node> getNodes() {
        return nodeRepository.findAll();
    }

    @Override
    public Node modify(Integer id, Gender gender) throws NodeDoesNotExistException {
        Node node = this.getNode(id);
        node.setGender(gender);
        return this.nodeRepository.save(node);
    }

}
