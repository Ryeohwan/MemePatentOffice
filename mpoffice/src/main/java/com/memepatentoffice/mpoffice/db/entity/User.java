package com.memepatentoffice.mpoffice.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class User extends BaseEntity{
    @Column(nullable = false, length = 20)
    String name;
    @Column(nullable = false)
    String email;
    @Column(nullable = false, length = 20)
    String nickname;
    String profileImage;
    String walletAddress;

//    ??? isValid;
    @CreatedDate
    LocalDateTime createdAt;
    @LastModifiedDate
    LocalDateTime updatedAt;

}
