package com.memepatentoffice.mpoffice.db.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Comment extends BaseEntity{
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch =FetchType.LAZY)
    @JoinColumn(name = "meme_id")
    private Meme meme;

    @OneToOne(fetch = FetchType.LAZY )
    @JoinColumn(name = "parent_comment_id")
    private Comment parentComment;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    private List<UserCommentLike> userCommentLikes = new ArrayList<>();

//    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL,orphanRemoval = true)
//    private List<Alarm> alarmList = new ArrayList<>();

    @Column(name = "content")
    private String content;

    @Column(name = "is_valid")
    @Enumerated(EnumType.STRING)
    private IsValid isValid;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Builder
    public Comment(String content, User user, Meme meme, Comment parentComment, IsValid isValid , LocalDateTime createdAt){
        this.content=content;
        this.user=user;
        this.meme=meme;
        this.parentComment=parentComment;
        this.isValid=isValid;
        this.createdAt=createdAt;
    }



}

