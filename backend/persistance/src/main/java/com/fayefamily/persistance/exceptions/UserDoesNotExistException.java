package com.fayefamily.persistance.exceptions;

public class UserDoesNotExistException extends Exception {
    public UserDoesNotExistException(String msg) {
        super(msg);
    }
}
