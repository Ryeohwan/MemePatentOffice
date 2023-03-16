package com.memepatentoffice.mpoffice.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Meme {
    @Id
    @Column(name = "meme_id", nullable = false)
    private Integer id;

    @Column(name = "creater_id", nullable = false)
    private Long createrId;

    @Column(name = "owner_id", nullable = false)
    private Long ownerId;

    @Column(name = "id")
    private Long id1;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "imageurl")
    private String imageurl;

}