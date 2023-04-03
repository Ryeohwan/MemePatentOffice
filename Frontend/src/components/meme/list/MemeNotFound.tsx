import React, {useEffect} from "react";
import useAxios from "hooks/useAxios";
import { memeType } from "store/memeList";

import NftCard from "components/common/card/NftCard";
import styles from "components/meme/list/MemeNotFound.module.css";
import SkeletonCard from "components/common/card/SkeletonCard";

const MemeNotFound: React.FC = () => {
  const {data, isLoading, sendRequest} = useAxios();

  // landering시 random meme get
  useEffect(() => {
    sendRequest({url: '/api/mpoffice/meme/random'})
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.textDiv}>
        <p>딱 맞는 결과가 없어서 비슷한걸 찾아봤어요.</p>
      </div>
      <div className={styles.randomContainer}>
        <p>이 밈은 어떠신가요?</p>
        {isLoading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
        {!isLoading && data && data.length > 0 && (
          data.map((meme: memeType) => {
              return <NftCard key={meme.id} items={meme} />;
            })
        )}
      </div>
    </div>
  );
};

export default MemeNotFound;
