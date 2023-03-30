import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { memeListActions } from "store/memeList";

import NftCard from "components/common/card/NftCard";

import styles from "./MemeListPopular.module.css";

type memeList = {
  id: number;
  title: string;
  imgUrl: string;
  description: string;
  example: string;
};

const MemeListPopular: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const memeList = useSelector<RootState, memeList[]>(
    (state) => state.memeList.memePopularList
  );
  const period = useSelector<RootState, string>(state => state.memeList.period);

  
  // click하면 url 바꾸기
  const changePeriodHandler = (period: string) => {
    dispatch(memeListActions.changePeriod(period))
    navigate(`?range=${period}`);
  }
  
  // query 받아서 redux에 type 바꾸기
  // 새로고침시에 query 없어짐 -> 일단 today
  // home에서 넘어올때 다른애들 잘 되는지 확인해보기
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const range = params.get('range')
    console.log(range)
    if (range) dispatch(memeListActions.changePeriod(range))
    else dispatch(memeListActions.changePeriod('today'))
  }, [location])

  return (
    <div className={styles.memeListPopularContainer}>
      <div className={styles.sortContainer}>
        <div className={`${period === 'today' ? styles.active : styles.nonActive}`} onClick={() => changePeriodHandler('today')}>오늘</div>
        <div className={`${period === 'week' ? styles.active : styles.nonActive}`} onClick={() => changePeriodHandler('week')}>1주일</div>
        <div className={`${period === 'all' ? styles.active : styles.nonActive}`} onClick={() => changePeriodHandler('all')}>전체</div>
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
