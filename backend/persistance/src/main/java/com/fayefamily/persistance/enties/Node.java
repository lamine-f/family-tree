package com.fayefamily.persistance.enties;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fayefamily.persistance.enums.Gender;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString


public class Node {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idNode;
    Gender gender;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Relation> parents;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Relation> children;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Relation> siblings;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Relation> spouses;


    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @Column(name = "id")
    User id;
}
