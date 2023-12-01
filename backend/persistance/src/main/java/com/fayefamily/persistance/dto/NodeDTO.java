package com.fayefamily.persistance.dto;

import com.fayefamily.persistance.enties.Relation;
import com.fayefamily.persistance.enums.Gender;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.io.Serializable;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NodeDTO implements Serializable {
    String id;
    Gender gender;
    List<Relation> parents;
    List<Relation> children;
    List<Relation> siblings;
    List<Relation> spouses;
}
