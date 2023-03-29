import React from "react";

import styles from "components/common/SkeletonCard.module.css";
import { Skeleton } from "primereact/skeleton";

const SkeletonCard: React.FC = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonCard}>
      <Skeleton className={styles.skeletonImg}></Skeleton>
      <Skeleton className={styles.skeletontext}></Skeleton>
      </div>
    </div>
  );
};

export default SkeletonCard;
