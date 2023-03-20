package com.memepatentoffice.auth.db.repository;

import com.memepatentoffice.auth.db.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
}
