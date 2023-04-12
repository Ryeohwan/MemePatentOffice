package com.memepatentoffice.mpoffice.common.security;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.User;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) {
        User user = null;

        try {
            user = userRepository.findByEmail(email).orElseThrow(
                    () -> new NotFoundException(email + " : User")
            );
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }

        return UserPrincipal.create(user);
    }
    @Transactional
    public UserDetails loadUserById(Long id) throws NotFoundException {
        User user = userRepository.findById(id).orElseThrow(
                () -> new NotFoundException(id + ": User")
        );
        return UserPrincipal.create(user);
    }

}