import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import styles from "./CommentItem.module.css";
import commentList, { commentType } from "store/commentList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { commentListActions } from "store/commentList";
import ReplyCommentItem from "./ReplyComentItem";
import useAxios from "hooks/useAxios";
import { useAppDispatch } from "hooks/useAppDispatch";
import ElapsedText from "components/common/elements/ElapsedText";
import { useInView } from "react-intersection-observer";

interface CommentType {
  items: commentType;
}

const CommentItem: React.FC<CommentType> = (comment) => {
  const userNickname = JSON.parse(sessionStorage.getItem("user")!).nickname;
  const userId = JSON.parse(sessionStorage.user).userId;
  const params = useParams();
  const memeid = parseInt(params.meme_id!, 10);

  const commentWriterName = comment.items.nickname;
  const commentId = comment.items.id;
  const writerProfileImg = comment.items.profileImage;
  const date = new Date(comment.items.date);
  const commentDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  // date = new Date('2013-03-10T02:00:00Z');
  // date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
  const commentText = comment.items.content;
  const heart = comment.items.liked;
  const best = comment.items.best;
  const [replyCnt, setReplyCnt] = useState(comment.items.replyCommentCnt);
  const heartNum = comment.items.heartCnt;
  const elapsedText = ElapsedText(comment.items.date);
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const { sendRequest: postCommentRequest } = useAxios();
  const { sendRequest: deleteCommentRequest } = useAxios();
  const [clickViewReply, setClickViewReply] = useState(false);

  const newReply = useSelector<RootState, commentType|null>(state=>state.commentList.replyComment)
  const [replyCommentList, setReplyCommentList] = useState<commentType[]>([]);
  const [lastCommentRef, setLastCommentRef] = useState(-1);
  const { data: replyData, sendRequest } = useAxios();
  const {sendRequest : deleteReplyRequest} = useAxios()
  // 좋아요 눌렀을 때 내가 이미 좋아한 댓글이면 좋아요 취소, 아니면 좋아요 => 좋아요 개수 -1, +1
  const handleHeart = () => {
    // 좋아요 토글
    // setHeartStatus(!heartStatus);
    // 좋아하면 +1, 취소면 -1
    dispatch(commentListActions.toggleLike(commentId));
    postCommentRequest({
      url: `/api/mpoffice/meme/comment/like?state=${heart}`,
      method: "POST",
      data: {
        commentId: commentId,
        userId: userId,
      },
    });
  };

  const getReplyList = () => {
    sendRequest({
      url: `/api/mpoffice/meme/comment/reply?memeId=${memeid}&userId=${userId}&commentId=${commentId}${
        lastCommentRef !== -1 ? `&idx=${lastCommentRef}` : `&idx=0`
      }`,
    });

    if(!clickViewReply){
      setClickViewReply(true);
    }
  };

  const closeReplyList = () => {
    setClickViewReply(false);
    setReplyCommentList([]);
    setLastCommentRef(-1);
  };
  useEffect(() => {
    if (replyData) {
      setReplyCommentList((prev) => [...prev, ...replyData.content]);
      setLastCommentRef(replyData.content[replyData.content.length - 1].id);
      setHasNext(!replyData.last)
    }
  }, [replyData]);

  // 답글달기 클릭하면 redux의 parentId, parentName 바꿈
  const uploadReply = () => {
    dispatch(commentListActions.changeNowParentId(commentId));
    dispatch(commentListActions.changeNowParentName(commentWriterName));
  };
  
  useEffect(()=>{
    if(newReply?.parentId === commentId){
      setReplyCommentList((prev)=>[...prev, newReply!])
      setClickViewReply(true);
      setReplyCnt(prev=>prev+1)
    }
  },[newReply])

  const deleteReply = (id:number) => {
    deleteReplyRequest({
      url: "/api/mpoffice/meme/comment/delete",
      method: "POST",
      data: {
        userId: userId,
        memeId: memeid,
        commentId: id
      }
    });

    if (replyCommentList.length>0){
      setReplyCommentList(replyCommentList.filter((comment) => {
        return comment.id !== id
      }))
    }
    setReplyCnt((prev)=>prev-1)
  }

  const onClickDelete = () => {
    deleteCommentRequest({
      url: "/api/mpoffice/meme/comment/delete",
      method: "POST",
      data: {
        userId: userId,
        memeId: memeid,
        commentId: commentId,
      },
    });
    console.log("원댓글 id ", commentId);
    dispatch(commentListActions.commentDeleteHandler(commentId));
  };

  // 무한 스크롤
  const [hasNext,setHasNext] = useState<boolean>()

  return (
    <div className={styles.commentItemContainer}>
      <div className={styles.userImgWrapper}>
        <img src={writerProfileImg} alt="" className={styles.commentUserImg} />
      </div>

      <div className={styles.commentInfoWrapper}>
        <div className={styles.commentHeader}>
          <div className={styles.commentUserName}>{commentWriterName}</div>

          {/* 날짜 형식 바꾸고 넣기 */}
          <div className={styles.commentTime}>{elapsedText}</div>
          {best === 1 && <div className={styles.bestComment}>Best</div>}
        </div>

        <div className={styles.commentBody}>
          <div className={styles.commentText}>{commentText}</div>
          <div className={styles.iconWrapper} onClick={handleHeart}>
            {heart ? (
              <Icon
                icon="clarity:heart-solid"
                className={styles.heartFilledIcon}
              />
            ) : (
              <Icon icon="clarity:heart-line" className={styles.heartIcon} />
            )}
          </div>
        </div>

        <div className={styles.userReaction}>
          {heartNum !== 0 && <div>좋아요 {heartNum}개</div>}
          <div onClick={uploadReply}>답글 달기</div>
          {userNickname === commentWriterName ? (
            <div onClick={onClickDelete}>삭제</div>
          ) : null}
        </div>

        {replyCnt !== 0 ? (
          <div>
            {!clickViewReply ? (
              <div className={styles.replyContainer}>
                <div>
                  <hr />
                </div>
                <div onClick={getReplyList}> 답글 {replyCnt}개 더보기 </div>
              </div>
            ) : (
              <div>
                <div className={styles.replyContainer}>
                  <div>
                    <hr />
                  </div>
                  <div onClick={closeReplyList}> 답글 숨기기 </div>
                </div>
                {replyCommentList.map((item) => {
                  return (
                    <>
                      {item.parentId === commentId && (
                        <ReplyCommentItem
                          key={`reply1-${item.id}-${item.date}`}
                          writerImg={item.profileImage}
                          writerNickname={item.nickname}
                          createdAt={item.date}
                          content={item.content}
                          userNickname={userNickname}
                          userId={userId}
                          memeid={memeid}
                          id={item.id}
                          deleteReply={deleteReply}
                        />
                      )}
                    </>
                  );
                })}
                {hasNext && (
                  <div className={styles.replyContainer}>
                    <div>
                      <hr />
                    </div>
                    <div onClick={getReplyList}>
                      답글 {replyCnt - replyCommentList.length}개 더보기{" "}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            {replyCommentList.map((item) => {
              return (
                <>
                  {item.parentId === commentId && (
                    <ReplyCommentItem
                      key={`reply-${item.id}-${item.date}`}
                      writerImg={item.profileImage}
                      writerNickname={item.nickname}
                      createdAt={item.date}
                      content={item.content}
                      userNickname={userNickname}
                      userId={userId}
                      memeid={memeid}
                      id={item.id}
                      deleteReply={deleteReply}
                    />
                  )}
                </>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
