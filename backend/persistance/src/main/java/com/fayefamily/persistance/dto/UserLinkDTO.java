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
public class UserLinkDTO implements Serializable {
    Integer userId;
    FamilyType familyType;
}
