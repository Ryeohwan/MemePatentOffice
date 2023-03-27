package com.memepatentoffice.mpoffice.domain.user.db.repository;

import com.memepatentoffice.mpoffice.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserById(String userId);

    Boolean existsUserById(Long id);

    Boolean existsUserByEmail(String email);
    User findUserById(Long id);



}
