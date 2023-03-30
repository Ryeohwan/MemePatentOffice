package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


public interface CommentRepository extends JpaRepository<Comment,Long> {
    @Override
    <S extends Comment> S save(S entity);
    @Query("SELECT e FROM Comment e JOIN UserCommentLike e2 " +
            "where e.id = e2.comment.id ORDER BY e.createdAt ASC")
    List<Comment> findCommentsByMemeId(Long id);
    Optional<Comment> findCommentById(Long id);
    int countAllByParentCommentId(Long id);

    // 여기서 베스트 3개 id 를받습니다. - 여기서 인기순 정렬한 값

    @Query("SELECT c.content, c.createdAt, " +
            " COUNT(d) as replyCommentCnt, " +
            " c.id, c.user.nickname, c.user.profileImage, " +
            " COUNT(l) as heartCnt," +
            " EXISTS(SELECT 1 FROM UserCommentLike l WHERE l.comment.id = c.id) as liked" +
            " FROM Comment c " +
            " LEFT JOIN UserCommentLike l ON l.comment.id = c.id" +
            " LEFT JOIN Comment d ON c.id = d.parentComment.id " +
            " WHERE c.meme.id = :memeId " +
            " GROUP BY c.content, c.createdAt, c.id, c.user.nickname, c.user.profileImage, liked" +
            " ORDER BY heartCnt desc ")
    Slice<Comment> findBestThreeComment(@Param("memeId")Long memeId);

    @Query("SELECT c.content, c.createdAt, " +
            " COUNT(d) as replyCommentCnt, " +
            " c.id, c.user.nickname, c.user.profileImage, " +
            " COUNT(l) as heartCnt," +
            " EXISTS(SELECT 1 FROM UserCommentLike l WHERE l.comment.id = c.id) as liked" +
            " FROM Comment c " +
            " LEFT JOIN UserCommentLike l ON l.comment.id = c.id" +
            " LEFT JOIN Comment d ON c.id = d.parentComment.id " +
            " WHERE c.meme.id = :memeId and c.id not in(:id1, :id2, :id3)" +
            " GROUP BY c.content, c.createdAt, c.id, c.user.nickname, c.user.profileImage, liked" +
            " ORDER BY heartCnt DESC ")
    Slice<Comment> findPopularComment(@Param("memeId")Long memeId, @Param("id1")Long id1, @Param("id2") Long id2, @Param("id3") Long id3, Pageable pageable);

    @Query("SELECT c.content, c.createdAt, " +
            " COUNT(d) as replyCommentCnt, " +
            " c.id, c.user.nickname, c.user.profileImage, " +
            " COUNT(l) as heartCnt," +
            " EXISTS(SELECT 1 FROM UserCommentLike l WHERE l.comment.id = c.id) as liked" +
            " FROM Comment c " +
            " LEFT JOIN UserCommentLike l ON l.comment.id = c.id" +
            " LEFT JOIN Comment d ON c.id = d.parentComment.id " +
            " WHERE c.meme.id = :memeId and c.id not in(:id1, :id2, :id3)" +
            " GROUP BY c.content, c.createdAt, c.id, c.user.nickname, c.user.profileImage, liked" +
            " ORDER BY c.createdAt desc ")
    Slice<Comment> findLatestComment(@Param("memeId")Long memeId, @Param("id1")Long id1, @Param("id2") Long id2, @Param("id3") Long id3, Pageable pageable);

    @Query("SELECT c.content, c.createdAt, " +
            " COUNT(d) as replyCommentCnt, " +
            " c.id, c.user.nickname, c.user.profileImage, " +
            " COUNT(l) as heartCnt," +
            " EXISTS(SELECT 1 FROM UserCommentLike l WHERE l.comment.id = c.id) as liked" +
            " FROM Comment c " +
            " LEFT JOIN UserCommentLike l ON l.comment.id = c.id" +
            " LEFT JOIN Comment d ON c.id = d.parentComment.id " +
            " WHERE c.meme.id = :memeId and c.id not in(:id1, :id2, :id3)" +
            " GROUP BY c.content, c.createdAt, c.id, c.user.nickname, c.user.profileImage, liked" +
            " ORDER BY c.createdAt ASC ")
    Slice<Comment> findOldestComment(@Param("memeId")Long memeId, @Param("id1")Long id1, @Param("id2") Long id2, @Param("id3") Long id3, Pageable pageable);
}
