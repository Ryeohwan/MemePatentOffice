import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/configStore";
import { memeListActions } from "store/memeList";
import { memeType } from "store/memeList";

import NftCard from "components/common/card/NftCard";
import styles from "components/meme/list/MemeNotFound.module.css";

const MemeNotFound: React.FC = () => {
  const randomMemeList = useSelector<RootState, memeType[]>(
    (state) => state.memeList.memeRandomList
  );
  return (
    <div className={styles.container}>
      <div className={styles.textDiv}>
        <p>딱 맞는 결과가 없어서 비슷한걸 찾아봤어요.</p>
      </div>
      <div className={styles.randomContainer}>
        <p>이 밈은 어떠신가요?</p>
        {randomMemeList.map((meme) => {
          return <NftCard key={meme.id} items={meme} />;
        })}{" "}
      </div>
    </div>
  );
};

export default MemeNotFound;
