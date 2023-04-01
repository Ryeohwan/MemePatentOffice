import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { memeListActions, memeType } from "store/memeList";

import NftCard from "components/common/card/NftCard";
import styles from "./MemeListPopular.module.css";


const MemeListPopular: React.FC = () => {
  const dispatch = useDispatch();
  const memeList = useSelector<RootState, memeType[]>((state) => state.memeList.memePopularList);
  const range = useSelector<RootState, string>(state => state.memeList.range);

  // click하면 url 바꾸고 redux에 type 바꾸기
  const changePeriodHandler = (period: string) => {
    dispatch(memeListActions.changeRange(period))
  }
  
  console.log('여기', range)

  return (
    <div className={styles.memeListPopularContainer}>
      <div className={styles.sortContainer}>
        <div className={`${range === 'today' ? styles.active : styles.nonActive}`} onClick={() => changePeriodHandler('today')}>오늘</div>
        <div className={`${range === 'week' ? styles.active : styles.nonActive}`} onClick={() => changePeriodHandler('week')}>1주일</div>
        <div className={`${range === 'all' ? styles.active : styles.nonActive}`} onClick={() => changePeriodHandler('all')}>전체</div>
      </div>
      
      <div className={styles.memeListCardContainer}>
        {memeList.map((meme) => {
          return <NftCard key={meme.id} items={meme} />;
        })}
      </div>
    
    </div>
  );
};

export default MemeListPopular;
