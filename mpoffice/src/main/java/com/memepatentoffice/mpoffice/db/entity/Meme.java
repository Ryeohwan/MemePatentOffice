package com.memepatentoffice.mpoffice.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
public class Meme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meme_id", nullable = false)
    private Long id;

    @Column(name = "creater_id", nullable = false)
    private Long createrId;

    @Column(name = "owner_id", nullable = false)
    private Long ownerId;


    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "imageurl")
    private String imageurl;

    @Column(name = "situation")
    private String situation;

    @Builder
    public Meme(Long id, Long createrId, Long ownerId, String title, String content, LocalDateTime createdAt, String imageurl, String situation) {
        this.id = id;
        this.createrId = createrId;
        this.ownerId = ownerId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.imageurl = imageurl;
        this.situation = situation;
    }

    public Meme() {
    }
}