package com.mtld.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * created by seongmin on 2022/09/19
 */
@ResponseStatus(HttpStatus.FORBIDDEN)
public class AuthException extends RuntimeException {
    public AuthException() {
    }

    public AuthException(String message) {
        super(message);
    }
}
