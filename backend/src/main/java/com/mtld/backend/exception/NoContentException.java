package com.mtld.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * created by seongmin on 2022/09/19
 */
@ResponseStatus(HttpStatus.NO_CONTENT)
public class NoContentException extends RuntimeException {
    public NoContentException() {
    }

    public NoContentException(String message) {
        super(message);
    }
}
