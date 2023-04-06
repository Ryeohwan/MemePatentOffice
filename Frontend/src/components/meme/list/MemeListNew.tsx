import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "hooks/useAppDispatch";
import { RootState } from "store/configStore";
import { getMemeNewListAxiosThunk, memeType } from "store/memeList";
import { useInView } from "react-intersection-observer";

import SkeletonCard from "components/common/card/SkeletonCard";
import NftCard from "components/common/card/NftCard";
import { ScrollTop } from "primereact/scrolltop";
import styles from "./MemeListNew.module.css";

const MemeListNew: React.FC = () => {
  const appDispatch = useAppDispatch();
  const input = useSelector<RootState, string>((state) => state.memeList.input);
  const memeList = useSelector<RootState, memeType[]>(
    (state) => state.memeList.memeNewList
  );
  const loadingMore = useSelector<RootState, boolean>(
    (state) => state.memeList.loadingMemeNewListMore
  );
  const hasNext = useSelector<RootState, boolean>(
    (state) => state.memeList.nextMemeNewList
  );
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

        {loadingMore && <SkeletonCard />}

        {/* 무한스크롤 감지 옵저버 */}
        <div ref={hasNext ? ref : null} />

        <ScrollTop
          target="parent"
          threshold={100}
          icon="pi pi-arrow-up text-base"
          style={{
            position: "fixed",
            marginLeft: "0",
            bottom: "10%",
            right: "16px",
            background: "var(--navy-color)",
            width: "44px",
            height: "44px",
          }}
        />
        
      </div>
    </>
  );
};

export default MemeListNew;
