import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { useAppDispatch } from "hooks/useAppDispatch";
import { memeListActions, getMemePopularListAxiosThunk, memeType } from "store/memeList";
import { useInView } from "react-intersection-observer";

import SkeletonCard from "components/common/card/SkeletonCard";
import NftCard from "components/common/card/NftCard";
import styles from "./MemeListPopular.module.css";


const MemeListPopular: React.FC = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const input = useSelector<RootState, string>((state) => state.memeList.input);
  const range = useSelector<RootState, string>(state => state.memeList.range);
  const memeList = useSelector<RootState, memeType[]>((state) => state.memeList.memePopularList);
  const loadingMore = useSelector<RootState, boolean>((state) => state.memeList.loadingMemePopularListMore);
  const loadingRange = useSelector<RootState, boolean>((state) => state.memeList.loadingMemePopularListRange);
  const hasNext = useSelector<RootState, boolean>((state) => state.memeList.nextMemePopularList);
  const [lastMemeRef, setLastMemeRef] = useState(-1);

  // click하면 url 바꾸고 redux에 type 바꾸기
  const changePeriodHandler = (period: string) => {
    dispatch(memeListActions.resetMemePopularList());
    dispatch(memeListActions.changeRange(period))
  }
  
  console.log('여기', range)  

  // 무한스크롤
  const [ref, inView] = useInView({
    threshold: 1,
    delay: 300,
  });

  useEffect(() => {
    if (inView && lastMemeRef !== -1) {
      appDispatch(getMemePopularListAxiosThunk(input, range, false, lastMemeRef));
    }
  }, [inView]);

  useEffect(() => {
    if (memeList.length > 0) {
      setLastMemeRef(memeList[memeList.length - 1].id - 1);
    }
  }, [memeList]);

  return (
    <div className={styles.memeListPopularContainer}>
      <div className={styles.sortContainer}>
        <div className={`${range === 'all' ? styles.active : styles.nonActive}`} onClick={() => changePeriodHandler('all')}>전체</div>
        <div className={`${range === 'week' ? styles.active : styles.nonActive}`} onClick={() => changePeriodHandler('week')}>1주일</div>
        <div className={`${range === 'today' ? styles.active : styles.nonActive}`} onClick={() => changePeriodHandler('today')}>오늘</div>
      </div>
      
      <div className={styles.memeListCardContainer}>
        
        {loadingRange && (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
        
        {memeList.map((meme) => {
          return <NftCard key={meme.id} items={meme} />;
        })}

        {loadingMore && <SkeletonCard /> }

        {/* 무한스크롤 감지 옵저버 */}
        <div ref={hasNext ? ref : null} />

      </div>
    </div>
  );
};

export default MemeListPopular;
