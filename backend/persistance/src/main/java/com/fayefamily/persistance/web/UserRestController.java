package com.fayefamily.persistance.web;

import com.fayefamily.persistance.dto.UserDTO;
import com.fayefamily.persistance.enties.Node;
import com.fayefamily.persistance.enties.Relation;
import com.fayefamily.persistance.enties.User;
import com.fayefamily.persistance.enums.Gender;
import com.fayefamily.persistance.exceptions.NodeDoesNotExistException;
import com.fayefamily.persistance.exceptions.UserDoesNotExistException;
import com.fayefamily.persistance.repositories.NodeRepository;
import com.fayefamily.persistance.repositories.UserRepository;
import com.fayefamily.persistance.services.UploadFileService;
import com.fayefamily.persistance.services.node.ServiceNode;
import com.fayefamily.persistance.services.user.ServiceUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("users")
@CrossOrigin(origins = "*")
public class UserRestController {
    private UserRepository userRepository;
    private ServiceUser serviceUser;
    private UploadFileService uploadFileService;
    private ServiceNode serviceNode;

    public UserRestController(
            UserRepository userRepository,
            ServiceUser serviceUser,
            UploadFileService uploadFileService,
            ServiceNode serviceNode
    ) {
        this.userRepository = userRepository;
        this.serviceUser = serviceUser;
        this.uploadFileService = uploadFileService;
        this.serviceNode = serviceNode;
    }

    @GetMapping(
            value = "",
            produces = "application/json"
    )
    @CrossOrigin(origins = "*")
    public ResponseEntity<Map<String, Object>>  getAllUsers () {
        return ResponseEntity.status(200).body(Map.of("dataResponse", serviceUser.getUsers().stream().map(user -> {
            UserDTO userDTO = this.serviceUser.toDTO(user);
            userDTO.setGender(user.getNode().getGender());
            return userDTO;
        } ) ));
    }

    @PutMapping(
            value = "",
            produces = "application/json",
            consumes = "multipart/form-data"
    )
    @CrossOrigin(origins = "*")
    public ResponseEntity<Map<String, Object>>  addUser (
            @RequestParam(value = "picture", required = false) MultipartFile picture,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("gender") Gender gender

    ) {
        UserDTO userDTO = new UserDTO();
        userDTO.setFirstName(firstName);userDTO.setLastName(lastName);userDTO.setGender(gender);
        User userSaving = serviceUser.addUser(userDTO);

        userSaving.setPicture("/pictures/"+userSaving.getId());
        UserDTO userDTOSaved = this.serviceUser.toDTO( this.userRepository.save(userSaving) );

        if ( picture == null ) {
            return ResponseEntity.status(200).body(Map.of("dataResponse", userDTOSaved ));
        }else {
            this.uploadFileService.saveFile(picture, "/workspace/familytree/frontend/public/pictures/", userSaving.getId().toString());
        }
        return ResponseEntity.status(200).body(Map.of("dataResponse", userDTOSaved ));
    }

    @PatchMapping(
            value = "",
            produces = "application/json",
            consumes = "multipart/form-data"
    )
    @CrossOrigin(origins = "*")
    public ResponseEntity<Map<String, Object>>  modifyUser (
            @RequestParam(value = "picture", required = false) MultipartFile picture,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("gender") Gender gender,
            @RequestParam("id") String id
    ) {

        try {
            User userModified = serviceUser.modify(firstName, lastName, gender, Integer.valueOf(id));
            if ( picture != null ) {
                this.uploadFileService.saveFile(picture, "/workspace/familytree/frontend/public/pictures/", userModified.getId().toString());
//                userSaving.setPicture("/pictures/"+userSaving.getId());
//                UserDTO userDTOSaved = this.serviceUser.toDTO( this.userRepository.save(userSaving) );
            }
            return ResponseEntity.status(200).body(Map.of("dataResponse", this.serviceUser.toDTO(userModified) ));
        } catch (UserDoesNotExistException e) {
            return ResponseEntity.status(400).body(Map.of( "error", e.getMessage() ));
        } catch (NodeDoesNotExistException e) {
            return ResponseEntity.status(400).body(Map.of( "error", e.getMessage() ));
        }
    }

    @DeleteMapping(
            value = "",
            produces = "application/json"
    )
    @CrossOrigin(origins = "*")
    public ResponseEntity<Map<String, Object>>  deleteUser (
            @RequestBody UserDTO userDTO
    ) {

//        UserDTO savedUserDto = serviceUser.toDTO( serviceUser )
        System.out.println(userDTO);
        return ResponseEntity.status(200).body(Map.of("dataResponse", "" ));
    }



    @GetMapping(
            value = "relations/{id}",
            produces = "application/json"
    )

    @CrossOrigin(origins = "*")
    public ResponseEntity<Map<String, Object>>  getRelations (
            @PathVariable(value = "id") Integer userId
    )  {

        try {
            List<HashMap<String, Object>> res = this.serviceNode.getRelations(userId);
            return ResponseEntity.status(200).body(Map.of("dataResponse", res ));
        } catch (UserDoesNotExistException e) {
            return ResponseEntity.status(400).body(Map.of( "error", e.getMessage() ));
        }
    }

}
