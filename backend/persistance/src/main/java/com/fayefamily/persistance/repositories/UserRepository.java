package com.fayefamily.persistance.repositories;

import com.fayefamily.persistance.enties.Node;
import com.fayefamily.persistance.enties.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

@RestResource
public interface UserRepository extends JpaRepository<User, Integer> {
}
