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

import java.util.HashMap;
import java.util.List;

public interface ServiceNode {

    public Node toUser (NodeDTO nodeDTO) throws UserDoesNotExistException;
    public NodeDTO toDto (Node node) throws UserDoesNotExistException;

    public Node addNode (NodeDTO nodeDTO) throws UserDoesNotExistException;
    public Node deleteNode (NodeDTO nodeDTO) throws UserDoesNotExistException, NodeDoesNotExistException, RelationNotExistException, SelfRelationNotPermittedExecption;
    //[TODO ADD RELATION TYPE]
    public Node deleteRelation(Integer userId, Relation relation, FamilyType type) throws UserDoesNotExistException, NodeDoesNotExistException, SelfRelationNotPermittedExecption, RelationNotExistException;
    public Node deleteRelations(NodeDTO nodeDTO) throws UserDoesNotExistException, NodeDoesNotExistException, SelfRelationNotPermittedExecption, RelationNotExistException;
    public Node addRelation(Integer userId, Relation relation, FamilyType type) throws UserDoesNotExistException, NodeDoesNotExistException, SelfRelationNotPermittedExecption;
    public List<HashMap<String, Object>> getRelations (Integer userId) throws UserDoesNotExistException;
    public List<Node> getNodes ();

    public Node modify( Integer id,  Gender gender) throws NodeDoesNotExistException;
}
