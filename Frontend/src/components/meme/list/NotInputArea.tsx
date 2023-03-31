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
      text: "폼 미쳤다",
      cnt: 765,
    },
    {
      rank: 2,
      text: "더글로리",
      cnt: 521,
    },
    {
      rank: 3,
      text: "폼 미쳤다",
      cnt: 422,
    },
    {
      rank: 4,
      text: "멋지다 연진아",
      cnt: 220,
    },
    {
      rank: 5,
      text: "송혜교",
      cnt: 165,
    },
    {
      rank: 6,
      text: "송혜교",
      cnt: 165,
    },
    {
      rank: 7,
      text: "송혜교",
      cnt: 165,
    },
    {
      rank: 8,
      text: "송혜교",
      cnt: 165,
    },
    {
      rank: 9,
      text: "송혜교",
      cnt: 165,
    },
    {
      rank: 10,
      text: "송혜교",
      cnt: 165,
    },
  ];


  const now = new Date();


  return ( 
    <div className={styles.compContainer}>
      <p className={styles.pageCnt}>등록된 밈 수 {!cntLoading && `${memeCnt}건`}</p>

      <div className={styles.rankingCompContainer}>
        
        <div className={styles.rankingHeader}>
          <p className={styles.headerTxt}>인기 검색어</p>
          <div className={styles.headerTime}>
            {now.getMonth()+1}.{now.getDate()}   {now.getHours()}:{now.getMinutes()}   기준
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
            {items.slice(6, 11).map((item) => (
              <SearchRankingItem item={item} key={item.rank} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotInputArea;
