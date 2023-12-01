package com.fayefamily.persistance.web;

import com.fayefamily.persistance.dto.NodeDTO;
import com.fayefamily.persistance.dto.UserDTO;
import com.fayefamily.persistance.dto.UserRelationDTO;
import com.fayefamily.persistance.enties.Node;
import com.fayefamily.persistance.enties.Relation;
import com.fayefamily.persistance.enums.Gender;
import com.fayefamily.persistance.exceptions.NodeDoesNotExistException;
import com.fayefamily.persistance.exceptions.RelationNotExistException;
import com.fayefamily.persistance.exceptions.SelfRelationNotPermittedExecption;
import com.fayefamily.persistance.exceptions.UserDoesNotExistException;
import com.fayefamily.persistance.repositories.NodeRepository;
import com.fayefamily.persistance.services.node.ServiceNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("nodes")
@CrossOrigin(origins = "*")
public class NodeRestController {

    private ServiceNode serviceNode;

    public NodeRestController(ServiceNode serviceNode) {
        this.serviceNode = serviceNode;
    }

    @GetMapping(
            value = "",
            produces = "application/json"
    )
    @CrossOrigin(origins = "*")
    public ResponseEntity<Map<String, Object>>  getAllNodes () {
        return ResponseEntity.status(200).body(Map.of("dataResponse", serviceNode.getNodes().stream().map(node -> {
            try {
                return this.serviceNode.toDto(node);
            } catch (UserDoesNotExistException e) {
                throw new RuntimeException(e);
            }
        }) ));
    }

    @PutMapping(
            value = "relation",
            produces = "application/json"
    )

    @CrossOrigin(origins = "*")
    public ResponseEntity<Map<String, Object>>  addRelation (
            @RequestBody UserRelationDTO userRelationDTO
    ) {
        NodeDTO nodeDTO1;
        System.out.println(userRelationDTO);
        try {
            nodeDTO1 = this.serviceNode.toDto( serviceNode.addRelation(userRelationDTO.getUserId(), userRelationDTO.getRelation(), userRelationDTO.getFamilyType()) );
        } catch (UserDoesNotExistException e) {
            return ResponseEntity.status(400).body(Map.of("dataResponse", new ArrayList<>(), "error", e.getMessage() ));
        } catch (NodeDoesNotExistException e) {
            return ResponseEntity.status(400).body(Map.of("dataResponse", new ArrayList<>(), "error", e.getMessage() ));
        } catch (SelfRelationNotPermittedExecption e) {
            return ResponseEntity.status(400).body(Map.of("dataResponse", new ArrayList<>(), "error", e.getMessage() ));
        }
        return ResponseEntity.status(200).body(Map.of("dataResponse", nodeDTO1 ));
    }


    @DeleteMapping(
            value = "relations",
            produces = "application/json"
    )

    @CrossOrigin(origins = "*")
    public ResponseEntity<Map<String, Object>>  deleteRelations (
            @RequestBody NodeDTO nodeDTO
    ) {

        try {
            Node node = this.serviceNode.deleteRelations(nodeDTO);
            return ResponseEntity.status(200).body(Map.of("dataResponse", this.serviceNode.toDto(node)));

        } catch (UserDoesNotExistException e) {
            return ResponseEntity.status(400).body(Map.of("dataResponse", new HashMap<>(), "error", e.getMessage() ));
        } catch (NodeDoesNotExistException e) {
            return ResponseEntity.status(400).body(Map.of("dataResponse", new HashMap<>(), "error", e.getMessage() ));
        } catch (RelationNotExistException e) {
            return ResponseEntity.status(400).body(Map.of("dataResponse", new HashMap<>(), "error", e.getMessage() ));
        } catch (SelfRelationNotPermittedExecption e) {
            return ResponseEntity.status(400).body(Map.of("dataResponse", new HashMap<>(), "error", e.getMessage() ));
        }
    }

    @PostMapping(
            value = "relation",
            produces = "application/json"
    )

    @CrossOrigin(origins = "*")
    public ResponseEntity<Map<String, Object>>  deleteRelation (
            @RequestBody UserRelationDTO userRelationDTO
    ) {

        try {
            Node node = this.serviceNode.deleteRelation(userRelationDTO.getUserId(), userRelationDTO.getRelation(), userRelationDTO.getFamilyType());
            return ResponseEntity.status(200).body(Map.of("dataResponse", this.serviceNode.toDto(node)));

        } catch (UserDoesNotExistException e) {
            return ResponseEntity.status(400).body(Map.of("dataResponse", new HashMap<>(), "error", e.getMessage() ));
        } catch (NodeDoesNotExistException e) {
            return ResponseEntity.status(400).body(Map.of("dataResponse", new HashMap<>(), "error", e.getMessage() ));
        } catch (RelationNotExistException e) {
            return ResponseEntity.status(400).body(Map.of("dataResponse", new HashMap<>(), "error", e.getMessage() ));
        } catch (SelfRelationNotPermittedExecption e) {
            return ResponseEntity.status(400).body(Map.of("dataResponse", new HashMap<>(), "error", e.getMessage() ));
        }
    }


}
