package com.memepatentoffice.mpoffice.api.handler;

import com.memepatentoffice.mpoffice.common.Exception.BadRequestException;
import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class ExceptionController {

    //400 BAD REQUEST
    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<?> handleBadRequestException(final BadRequestException ex){
        log.info(ex.getClass().getName());
        log.error("error", ex);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
    //401 UNAUTHORIZED
//    @ExceptionHandler({AccessDeniedException.class})
//    public ResponseEntity<?> handleAccessDeniedException(final AccessDeniedException ex){
//        log.info(ex.getClass().getName());
//        log.error("error", ex);
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
//    }

    //404 NOT FOUND
    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<?> handleNotFoundException(final NotFoundException ex){
        log.info(ex.getClass().getName());
        log.error("error", ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    //409 CONFLICT
//    public ResponseEntity<?> handleConflictException(final ConflictException ex)
//
    //500 INTERNAL SERVER ERROR
    public ResponseEntity<?> handleException(final Exception ex){
        log.info(ex.getClass().getName());
        log.error("error", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }

}
