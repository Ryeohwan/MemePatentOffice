import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { memeType } from "store/memeList";
import { memeListActions } from "store/memeList";

import NftCard from "components/common/card/NftCard";
import styles from "./MemeListNew.module.css";

const MemeListNew: React.FC = () => {
  const dispatch = useDispatch();
  const memeList = useSelector<RootState, memeType[]>(
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
