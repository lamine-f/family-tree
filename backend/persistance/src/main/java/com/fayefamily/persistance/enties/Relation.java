package com.fayefamily.persistance.enties;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fayefamily.persistance.enums.RelType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Relation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idRelation;
    String id;
    RelType type;
}
