import {useEffect} from 'react';
import SearchRankingItem from "./SearchRankingItem";
import useAxios from 'hooks/useAxios';

import styles from "./NotInputArea.module.css";

const NotInputArea: React.FC = () => {
  // axios 데이터 받아오기
  const {data: memeCnt, isLoading: cntLoading, sendRequest: cntRequest} = useAxios();

  // 1.등록된 밈 수  -> , 넣는걸로 custom
  useEffect(() => {
    cntRequest({url: `/api/mpoffice/meme/total`})
  }, [])

  // dummy
  // 2. 인기 검색어 데이터
  const items = [
    {
      rank: 1,
      text: "a",
    },
    {
      rank: 2,
      text: "test",
    },
    {
      rank: 3,
      text: "test임니다 test임니다 test임니다 test임니다",
    },
    {
      rank: 4,
      text: "테스트임니다 테스트임니다 테스트임니다 테스트임니다",
    },
    {
      rank: 5,
      text: "테스트임니다테스트임니다테스트임니다테스트임니다테스트임니다",
    },
    {
      rank: 6,
      text: "송혜교",
    },
    {
      rank: 7,
      text: "송혜교",
      cnt: 165,
    },
    {
      rank: 8,
      text: "송혜교",
    },
    {
      rank: 9,
      text: "송혜교",
    },
    {
      rank: 10,
      text: "송혜교",
    },
  ];


  const now = new Date();
  const month = (now.getMonth() +1).toString().padStart(2, "0")
  const day = (now.getDate()).toString().padStart(2, "0")
  const hour = (now.getHours()).toString().padStart(2, "0")
  const minute = (now.getMinutes()).toString().padStart(2, "0")

  return ( 
    <div className={styles.compContainer}>
      <p className={styles.pageCnt}>등록된 밈 수 {!cntLoading && `${memeCnt}건`}</p>

      <div className={styles.rankingCompContainer}>
        
        <div className={styles.rankingHeader}>
          <p className={styles.headerTxt}>인기 검색어</p>
          <div className={styles.headerTime}>
            {month}.{day}   {hour}:{minute} 기준
          </div>
        </div>


        {/* 나중에 data.items 이런식으로 내리기 */}
        <div className={styles.rankingContainer}>
          {/* 왼쪽 */}
          <div className={`${styles.itemContainer} ${styles.left}`}>
            {items.slice(0, 5).map((item) => (
              <SearchRankingItem item={item} key={item.rank} />
            ))}
          </div>

          {/* 오른쪽 */}
          <div className={`${styles.itemContainer} ${styles.right}`}>
            {items.slice(5, 11).map((item) => (
              <SearchRankingItem item={item} key={item.rank} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotInputArea;
