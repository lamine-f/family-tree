package com.fayefamily.persistance.dto;

import com.fayefamily.persistance.enums.Gender;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO implements Serializable {
    String id;
    String picture;
    String firstName;
    String lastName;
    Gender gender;

}
