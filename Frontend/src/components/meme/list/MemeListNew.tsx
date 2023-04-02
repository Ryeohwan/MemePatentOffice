import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getMemeNewListAxiosThunk, memeType } from "store/memeList";
import { useInView } from "react-intersection-observer";

import SkeletonCard from "components/common/card/SkeletonCard";
import NftCard from "components/common/card/NftCard";
import styles from "./MemeListNew.module.css";

const MemeListNew: React.FC = () => {
  const appDispatch = useAppDispatch();
  const input = useSelector<RootState, string>((state) => state.memeList.input);
  const memeList = useSelector<RootState, memeType[]>((state) => state.memeList.memeNewList);
  const loadingMore = useSelector<RootState, boolean>((state) => state.memeList.loadingMemeNewListMore);
  const hasNext = useSelector<RootState, boolean>((state) => state.memeList.nextMemeNewList);
  const [lastMemeRef, setLastMemeRef] = useState(-1);

  // 무한스크롤
  const [ref, inView] = useInView({
    threshold: 1,
    delay: 300,
  });

  useEffect(() => {
    if (inView && lastMemeRef !== -1) {
      appDispatch(getMemeNewListAxiosThunk(input, lastMemeRef));
    }
  }, [inView]);

  useEffect(() => {
    if (memeList.length > 0) {
      setLastMemeRef(memeList[memeList.length - 1].id - 1);
    }
  }, [memeList]);


  return (
    <>
      <div className={styles.memeListNewContainer}>
        {memeList.map((meme) => {
          return <NftCard key={meme.id} items={meme} />;
        })}

        {loadingMore && <SkeletonCard /> }

        {/* 무한스크롤 감지 옵저버 */}
        <div ref={hasNext ? ref : null} />
      </div>
    </>
  );
};

export default MemeListNew;
