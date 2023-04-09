package com.memepatentoffice.auction.api.handler;

import com.memepatentoffice.auction.common.exception.BadRequestException;
import com.memepatentoffice.auction.common.exception.ConflictException;
import com.memepatentoffice.auction.common.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.nio.file.AccessDeniedException;

@ControllerAdvice
@Slf4j
public class ExceptionController {
    //400 BAD REQUEST
    public ResponseEntity<?> handleBadRequestException(final BadRequestException ex){
        log.info(ex.getClass().getName());
        log.error("error", ex);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
    //401 UNAUTHORIZED
    public ResponseEntity<?> handleAccessDeniedException(final AccessDeniedException ex){
        log.info(ex.getClass().getName());
        log.error("error", ex);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }
    //404 NOT FOUND
    public ResponseEntity<?> handleNotFoundException(final NotFoundException ex){
        log.info(ex.getClass().getName());
        log.error("error", ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
    //409 CONFLICT
    public ResponseEntity<?> handleConflictException(final ConflictException ex){
        log.info(ex.getClass().getName());
        log.error("error", ex);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }
    //500 INTERNAL_SERVER_ERROR
    public ResponseEntity<?> handleException(final Exception ex){
        log.info(ex.getClass().getName());
        log.error("error", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }
}
