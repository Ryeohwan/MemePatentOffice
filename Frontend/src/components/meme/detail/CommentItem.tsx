import React from "react";
import haku from "assets/haku.png";
import { Icon } from "@iconify/react";
import styles from "./CommentItem.module.css";

const CommentItem:React.FC = () => {

    return (
        <div className={styles.commentItemContainer}>
            <div className={styles.userImgWrapper}>
                <img src={haku} alt="" className={styles.commentUserImg}/>
            </div>

            <div className={styles.commentInfoWrapper}>
                <div className={styles.commentHeader}>
                    <div className={styles.commentUserName}>
                        단발머리 부엉이
                    </div>
                    <div className={styles.commentTime}>
                        3주 전
                    </div>
                    <div className={styles.bestComment}>
                        Best
                    </div>
                </div>

                <div className={styles.commentBody}>
                    <div className={styles.commentText}>
                        댓글 어쩌구 저쩌구 와라로로로라라랑호로로로로로로로로로라라랄ㄹ  ㅎ허호호호호호호호 히히히힝 히히히 나능야 그리드 천재 서유진 지상 최대 그리드 신
                    </div>
                    <div className={styles.iconWrapper}>
                        <Icon icon="clarity:heart-line" className={styles.heartIcon}/>
                    </div>
                </div>

                <div className={styles.userReaction}>
                    <div>
                        좋아요 30개
                    </div>
                    <div>
                        답글 달기
                    </div>
                    <div>
                        삭제
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;