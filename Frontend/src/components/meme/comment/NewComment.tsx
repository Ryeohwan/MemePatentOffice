import React, { useRef, useEffect, useState, KeyboardEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { useParams } from "react-router-dom";
import { commentListActions } from "store/commentList";
import { Icon } from "@iconify/react";
import styles from "./NewComment.module.css";
import useAxios from "hooks/useAxios";

const NewComment: React.FC = () => {
  const dispatch = useDispatch();
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  // 공백이 아닐 때 true로, 댓글 게시
  const [uploadState, setUploadState] = useState(false);
  // 답글을 다는 중인지 댓글을 다는 중인지
  const [replyStatus, setReplyStatus] = useState(false);

  const userId = JSON.parse(sessionStorage.user).userId;
  const nowParentId = useSelector<RootState, number | null>(
    (state) => state.commentList.nowParentId
  );
  const parentName = useSelector<RootState, string | null>(
    (state) => state.commentList.nowParentName
  );

  const params = useParams();
  const memeid = parseInt(params.meme_id!, 10);
  const { data: postCommentResponseData, sendRequest: postCommentRequest } = useAxios();
  
  const textarea = document.getElementById("my-textarea");


  // 댓글 post
  const commentSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredComment = commentInputRef.current!.value;
    postCommentRequest({
      url: "/api/mpoffice/meme/comment/create",
      method: "POST",
      data: {
        userId: userId,
        memeId: memeid,
        content: enteredComment,
        parentId: nowParentId,
      },
    });
  };

  const commentKeyDownSubmitHandler:KeyboardEventHandler<HTMLTextAreaElement> = (e)=> {
    if(e.nativeEvent.key!=="Enter") return
    const enteredComment = commentInputRef.current!.value;
    postCommentRequest({
      url: "/api/mpoffice/meme/comment/create",
      method: "POST",
      data: {
        userId: userId,
        memeId: memeid,
        content: enteredComment,
        parentId: nowParentId,
      },
    });
  };

  // 답글달기 취소 누르면 parentId, parentName null로 바꿈
  const onClickCancelReply = () => {
    dispatch(commentListActions.changeNowParentId(null));
    dispatch(commentListActions.changeNowParentName(null));
    // focus
    textarea!.focus();
  };

  useEffect(() => {
    const textarea = document.querySelector("textarea");
    textarea?.addEventListener("keyup", (e) => {
      const target = e.target as HTMLTextAreaElement;

      // 댓글창 높이 늘어나게
      target.classList.add(styles.expanded);
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;

      // 댓글에 공백만 있으면 제출 불가
      const blank = /^\s+|\s+$/g;
      if (target.value.replace(blank, "") !== "") {
        setUploadState(true);
      } else {
        setUploadState(false);
      }
    });
  }, []);

  // 리덕스에서 가져온 parentId, parentName이 null이면 답글다는 중 컴포넌트 안 띄움
  useEffect(() => {
    if (nowParentId !== null) {
      setReplyStatus(true);
      // focus
      textarea!.focus();
    } else {
      setReplyStatus(false);
    }
  }, [nowParentId]);

  // 댓글 작성 후 받은 post response => redux
  useEffect(() => {
    console.log("댓글 작성하고 받은 데이터", postCommentResponseData);
    if (postCommentResponseData) {
      commentInputRef.current!.value = "";
      setReplyStatus(false);
      setUploadState(false);
      dispatch(commentListActions.changeNowParentId(null));
      dispatch(commentListActions.changeNowParentName(null));
      // 댓글 post 후 받은 response가 답글이면 리덕스의 답글리스트에, 댓글이면 댓글리스트에
      if (postCommentResponseData.parentId === null) {
        dispatch(commentListActions.commentAddHandler(postCommentResponseData));
      } else if (postCommentResponseData.parentId !== null ){
        dispatch(commentListActions.replyAddHandler(postCommentResponseData));
      }
    }
  }, [postCommentResponseData]);

  return (
    <div className={styles.newCommentContainer}>
      <form onSubmit={commentSubmitHandler} className={styles.newComment}>
        {replyStatus && (
          <div className={styles.replyNotifierContainer}>
            <div className={styles.replyNotifier}>
              {parentName} 님에게 답글 남기는 중
            </div>
            <div className={styles.cancelBtnWrapper}>
              <Icon
                icon="ph:x"
                className={styles.cancelBtn}
                onClick={onClickCancelReply}
              />
            </div>
          </div>
        )}
        <div className={styles.commentContainer}>
          <div className={styles.commentInputWrapper}>
            <textarea
              id="my-textarea"
              className={styles.commentInput}
              ref={commentInputRef}
              required
              onKeyDown={commentKeyDownSubmitHandler}
            />
          </div>
          <div className={styles.submitBtnWrapper}>
            {uploadState ? (
              <Icon
                className={styles.submitBtn}
                icon="ph:arrow-circle-up-fill"
                onClick={commentSubmitHandler}
                
              />
            ) : (
              <Icon
                className={styles.submitDisableBtn}
                icon="ph:arrow-circle-up-fill"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewComment;
