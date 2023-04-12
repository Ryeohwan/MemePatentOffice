import styles from "./NoComment.module.css";

const NoComment: React.FC = () => {
  return (
    <div className={styles.textContainer}>
      <p className={styles.text}>
        아직 작성된 댓글이 없습니다 !
      </p>
      <br />
      <p className={styles.text}>지금 바로 댓글을 달아보세요.</p>
    </div>
  );
};

export default NoComment;
