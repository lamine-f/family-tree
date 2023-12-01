package com.fayefamily.persistance.services.user;

import com.fayefamily.persistance.dto.NodeDTO;
import com.fayefamily.persistance.dto.UserDTO;
import com.fayefamily.persistance.enties.Node;
import com.fayefamily.persistance.enties.User;
import com.fayefamily.persistance.enums.Gender;
import com.fayefamily.persistance.exceptions.NodeDoesNotExistException;
import com.fayefamily.persistance.exceptions.RelationNotExistException;
import com.fayefamily.persistance.exceptions.SelfRelationNotPermittedExecption;
import com.fayefamily.persistance.exceptions.UserDoesNotExistException;
import com.fayefamily.persistance.repositories.UserRepository;
import com.fayefamily.persistance.services.node.ServiceNode;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;

@Service
public class ServiceUserImp implements ServiceUser{

    private UserRepository userRepository;
    private ServiceNode serviceNode;

    @Lazy
    public ServiceUserImp(
            UserRepository userRepository,
            ServiceNode serviceNode
    ) {
        this.userRepository = userRepository;
        this.serviceNode = serviceNode;
    }

    @Override
    public UserDTO toDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId().toString());userDTO.setFirstName(user.getFirstName());userDTO.setLastName(user.getLastName());userDTO.setPicture(user.getPicture());
        return userDTO;
    }

    @Override
    public User toUser(UserDTO userDTO) {
        User user = new User();
        user.setId(Integer.valueOf(userDTO.getId()));user.setFirstName(userDTO.getFirstName());user.setLastName(userDTO.getLastName());user.setPicture(userDTO.getPicture());
        return user;
    }

    @Override
    public User addUser(UserDTO userDTO) {
        User user = new User();
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPicture( userDTO.getPicture() );
        User userSaved = userRepository.save(user);

        NodeDTO nodeDTO = new NodeDTO();
        nodeDTO.setGender(userDTO.getGender());
        nodeDTO.setId(userSaved.getId().toString());
        Node node;
        try {
            node = this.serviceNode.addNode(nodeDTO);
        } catch (UserDoesNotExistException e) {
            throw new RuntimeException(e);
        }
        userSaved.setNode(node);

        return  this.userRepository.save(userSaved);
    }

    @Override
    public User deleteUser(UserDTO userDTO) throws UserDoesNotExistException, NodeDoesNotExistException, RelationNotExistException, SelfRelationNotPermittedExecption {
        User user = this.getUser( Integer.valueOf(userDTO.getId()) );

        Node node = user.getNode();
        this.serviceNode.deleteNode( this.serviceNode.toDto( node ) );

        this.userRepository.delete(user);
        return user;
    }

    @Override
    public User modify(String firstName, String lastName, Gender gender, Integer id) throws UserDoesNotExistException, NodeDoesNotExistException {

        User userModifying = this.getUser(id);
        userModifying.setFirstName(firstName);
        userModifying.setLastName(lastName);
        Node node = userModifying.getNode();
        this.serviceNode.modify(node.getIdNode(), gender);

        return this.userRepository.save(userModifying);
    }


    @Override
    public User getUser(Integer idUser) throws UserDoesNotExistException {
        User user =  userRepository.findById(idUser).orElse(null);
        if (user == null) throw new UserDoesNotExistException("uses does not exist");
        return user;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }
}
