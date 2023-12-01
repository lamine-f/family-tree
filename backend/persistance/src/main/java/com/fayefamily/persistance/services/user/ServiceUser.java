package com.fayefamily.persistance.services.user;

import com.fayefamily.persistance.dto.UserDTO;
import com.fayefamily.persistance.enties.User;
import com.fayefamily.persistance.enums.Gender;
import com.fayefamily.persistance.exceptions.NodeDoesNotExistException;
import com.fayefamily.persistance.exceptions.RelationNotExistException;
import com.fayefamily.persistance.exceptions.SelfRelationNotPermittedExecption;
import com.fayefamily.persistance.exceptions.UserDoesNotExistException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ServiceUser {

    public UserDTO toDTO(User user);
    public User toUser(UserDTO userDTO);

    public User addUser(UserDTO userDTO);
    public User deleteUser(UserDTO userDTO) throws UserDoesNotExistException, NodeDoesNotExistException, RelationNotExistException, SelfRelationNotPermittedExecption;
    public User modify(String firstName, String lastName, Gender gender, Integer id ) throws UserDoesNotExistException, NodeDoesNotExistException;
    public User getUser(Integer idUser) throws UserDoesNotExistException;
    public List<User> getUsers();
}
