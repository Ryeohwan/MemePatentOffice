import { useEffect } from "react";
import SearchRankingItem from "./SearchRankingItem";
import useAxios from "hooks/useAxios";

import styles from "./NotInputArea.module.css";

const NotInputArea: React.FC = () => {
  // axios 데이터 받아오기
  const {
    data: memeCnt,
    isLoading: cntLoading,
    sendRequest: cntRequest,
  } = useAxios();
  const {
    data: searchRanking,
    isLoading: rankingLoading,
    sendRequest: rankingRequest,
  } = useAxios();

  // 1.등록된 밈 수
  // 2. 인기 검색어
  useEffect(() => {
    cntRequest({ url: `/api/mpoffice/meme/total` });
    rankingRequest({ url: `/api/mpoffice/meme/search/bestDaily` });
  }, []);

  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hour = now.getHours().toString().padStart(2, "0");
  const minute = now.getMinutes().toString().padStart(2, "0");

  return (
    <div className={styles.compContainer}>
      <p className={styles.pageCnt}>
        등록된 밈 수 {!cntLoading && memeCnt && `${memeCnt}건`}
      </p>

      <div className={styles.rankingCompContainer}>
        <div className={styles.rankingHeader}>
          <p className={styles.headerTxt}>인기 검색어</p>
          <div className={styles.headerTime}>
            {month}.{day} {hour}:{minute} 기준
          </div>
        </div>

        {/* 나중에 data.items 이런식으로 내리기 */}
        <div className={styles.rankingContainer}>
          {/* 왼쪽 */}
          <div className={`${styles.itemContainer} ${styles.left}`}>
            {!rankingLoading &&
              searchRanking &&
              searchRanking.length > 0 &&
              searchRanking
                .slice(0, 5)
                .map((item: { title: string; rank: number; count: number }) => (
                  <SearchRankingItem item={item} key={item.rank} />
                ))}
          </div>

          {/* 오른쪽 */}
          <div className={`${styles.itemContainer} ${styles.right}`}>
            {!rankingLoading &&
              searchRanking &&
              searchRanking.length > 0 &&
              searchRanking
                .slice(5, 11)
                .map((item: { title: string; rank: number; count: number }) => (
                  <SearchRankingItem item={item} key={item.rank} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotInputArea;
