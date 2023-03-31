import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { useAppDispatch } from "hooks/useAppDispatch";
import { memeType } from "store/memeList";
import { memeListActions, getMemeNewListAxiosThunk } from "store/memeList";
import { useInView } from "react-intersection-observer";

import NftCard from "components/common/card/NftCard";
import styles from "./MemeListNew.module.css";

const MemeListNew: React.FC = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const input = useSelector<RootState, string>((state) => state.memeList.input);
  const memeList = useSelector<RootState, memeType[]>((state) => state.memeList.memeNewList);
  const loading = useSelector<RootState, boolean>((state) => state.memeList.loadingMemeNewList);
  const loadingMore = useSelector<RootState, boolean>((state) => state.memeList.loadingMemeNewListMore);
  const hasNext = useSelector<RootState, boolean>((state) => state.memeList.nextMemeNewList);
  const [lastMemeRef, setLastMemeRef] = useState(-1)

  // unmount시 list 비우기
  // 밈 상세에서 뒤로가기하면 리셋됨........
  useEffect(() => {
    return () => {
      dispatch(memeListActions.resetMemeNewList());
    };
  }, []);
  
  // input 변경시 get axios dispatch (lastPost = -1)
  useEffect(() => {
    if (!input) return;
    console.log("new list get!", input);
    appDispatch(getMemeNewListAxiosThunk(input, -1));
  }, [input]);


  // 무한스크롤
  const isMounted = useRef(false)
  const [ref, inView] = useInView({
    threshold: 0.5,
    delay: 500,
  })

  useEffect(() => {
    if (isMounted.current && inView && lastMemeRef !== -1) {
      appDispatch(getMemeNewListAxiosThunk(input, lastMemeRef));
    }
  }, [inView])

  useEffect(() => {
    if (isMounted.current) {
      if (memeList.length) {
        setLastMemeRef(memeList[memeList.length - 1].id - 1)
      }
    } else {
      isMounted.current = true
    }
  }, [memeList])


  // 무한스크롤 해야함 + loading skeleton
  return (
    <>
      <div className={styles.memeListNewContainer}>
        {loading && <p>loading중,,</p>}
        {!loading &&
          memeList.map((meme) => {
            return <NftCard key={meme.id} items={meme} />;
          })}
        
        {/* 무한스크롤 감지 옵저버 */}
        <div ref={hasNext ? ref : null} />
      </div>
    </>
  );
};

export default MemeListNew;
