package com.fayefamily.persistance.repositories;

import com.fayefamily.persistance.enties.Node;
import com.fayefamily.persistance.enties.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RestResource
public interface NodeRepository extends JpaRepository<Node, Integer> {
    public Node findNodeById(User user);
    public Node findNodeByIdNode(Integer id);


}
