import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { useAppDispatch } from "hooks/useAppDispatch";
import { memeType } from "store/memeList";
import { memeListActions, getMemeNewListAxiosThunk } from "store/memeList";
// import { getMemeNewListAxios } from "store/memeList/getMemeNewListAxios";

import NftCard from "components/common/card/NftCard";
import styles from "./MemeListNew.module.css";

const MemeListNew: React.FC = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const input = useSelector<RootState, string>((state) => state.memeList.input);
  const memeList = useSelector<RootState, memeType[]>(
    (state) => state.memeList.memeNewList
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.memeList.loadingMemeNewList
  );

  useEffect(() => {
    if (!input) return;
    console.log("new list get!", input);
    appDispatch(getMemeNewListAxiosThunk(input));
  }, [input]);

  // unmount시 list 비우기
  useEffect(() => {
    return () => {
      dispatch(memeListActions.resetMemeNewList());
    };
  }, []);


  // 무한스크롤 해야함 + loading skeleton
  return (
    <>
      <div className={styles.memeListNewContainer}>
        {loading && <p>loading중,,</p>}       
        {!loading &&
          memeList.map((meme) => {
            return <NftCard key={meme.id} items={meme} />;
          })}
      </div>
    </>
  );
};

export default MemeListNew;
