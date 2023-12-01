package com.fayefamily.persistance.web;

import com.fayefamily.persistance.dto.UserDTO;
import com.fayefamily.persistance.enties.Relation;
import com.fayefamily.persistance.enties.User;
import com.fayefamily.persistance.enums.Gender;
import com.fayefamily.persistance.exceptions.NodeDoesNotExistException;
import com.fayefamily.persistance.exceptions.UserDoesNotExistException;
import com.fayefamily.persistance.repositories.RelationRepository;
import com.fayefamily.persistance.repositories.UserRepository;
import com.fayefamily.persistance.services.UploadFileService;
import com.fayefamily.persistance.services.user.ServiceUser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("relations")
@CrossOrigin(origins = "*")
public class RelationRestController {
    private RelationRepository relationRepository;
    private ServiceUser serviceUser;

    public RelationRestController(
            RelationRepository relationRepository,
            ServiceUser serviceUser,
            UploadFileService uploadFileService
    ) {
        this.relationRepository = relationRepository;
        this.serviceUser = serviceUser;
    }

    @GetMapping(
            value = "",
            produces = "application/json"
    )
    @CrossOrigin(origins = "*")
    public ResponseEntity<Map<String, Object>>  getRelations () {
        return ResponseEntity.status(200).body(Map.of("dataResponse", serviceUser.getUsers().stream().map(user -> {
            UserDTO userDTO = this.serviceUser.toDTO(user);
            userDTO.setGender(user.getNode().getGender());
            return userDTO;
        } ) ));
    }

    @GetMapping(
            value = "/{id}",
            produces = "application/json"
    )
    @CrossOrigin(origins = "*")
    public ResponseEntity<Map<String, Object>>  getRelation (
            @PathVariable( value = "id") Integer userId
    ) {
        System.out.println(userId);
        List<Relation> relations = this.relationRepository.findAllById(userId.toString());
        return ResponseEntity.status(200).body(Map.of("dataResponse", relations ));
    }

}
