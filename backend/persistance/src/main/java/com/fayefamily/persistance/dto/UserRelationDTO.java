package com.fayefamily.persistance.dto;

import com.fayefamily.persistance.enties.Relation;
import com.fayefamily.persistance.enums.FamilyType;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserRelationDTO implements Serializable {
    Integer userId;
    Relation relation;
    FamilyType familyType;
}
