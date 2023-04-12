package com.memepatentoffice.mpoffice.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "search_results")
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Search extends BaseEntity{
    private String title;
    private LocalDateTime date;


}
