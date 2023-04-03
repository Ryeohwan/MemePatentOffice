import React from "react";

import styles from "pages/ResizePage.module.css";

const ResizePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        본 서비스는 모바일을 목적으로 제작된 서비스로,
      </p>
      <br />
      <p className={styles.text}>가로 너비 420px 이상은 지원하지 않습니다.</p>
    </div>
  );
};

export default ResizePage;
