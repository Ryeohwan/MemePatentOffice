package com.memepatentoffice.mpoffice.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Meme extends BaseEntity{
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creater_id")
    @JsonIgnore
    private User creater;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    @JsonIgnore
    private User owner;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "imageurl")
    private String imageurl;

    @Column(name = "situation")
    private String situation;

    @Column(name = "token_id")
    private int tokenId;

    @Column(name = "contract_address")
    private String contractAddress;
}