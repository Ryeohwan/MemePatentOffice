import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { memeListActions } from "store/memeList";

import NftCard from "components/common/NftCard";

import styles from "./MemeListNew.module.css";

type memeList = {
  id: number;
  title: string;
  imgUrl: string;
  description: string;
};

const MemeListNew: React.FC = () => {
  const dispatch = useDispatch();
  const memeList = useSelector<RootState, memeList[]>(
    (state) => state.memeList.memeNewList
  );

  // console.log(memeList);

  return (
    <div className={styles.memeListNewContainer}>
      {memeList.map((meme) => {
        return <NftCard key={meme.id} items={meme} />;
      })}
    </div>
  );
};

export default MemeListNew;
