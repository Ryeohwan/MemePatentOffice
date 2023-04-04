import {useEffect} from 'react';
import useAxios from 'hooks/useAxios';
import { memeType } from "store/memeList";
import SkeletonCard from 'components/common/card/SkeletonCard';
import NftCard from "components/common/card/NftCard";

import { ScrollTop } from "primereact/scrolltop";
import styles from "./ProfileTabComp.module.css";

interface Props {
  nickname: string
}

const ProfileNft: React.FC<Props> = ({ nickname }) => {
  const {data, status, isLoading, sendRequest} = useAxios();
  
  useEffect(() => {
    sendRequest({url: `/api/mpoffice/user/profile/memes/${nickname}`})
  }, [])

  return (
    <div className={styles.cardContainer}>
      {/* loading 중 */}
      {isLoading && <SkeletonCard />}

      {/* 소유한 nft 없는 경우 */}
      {!isLoading && status === 201 && data.length === 0 && (
        <div className={styles.notContent}>소유한 nft가 없습니다.</div>
      )}

      {/* nft 있는 경우 */}
      {!isLoading && status === 201 && data.length > 0 && (
        data.map((nft: memeType) => {
          return <NftCard key={nft.id} items={nft} />;
        })
      )}

      <ScrollTop
        target="parent"
        threshold={100}
        icon="pi pi-arrow-up text-base"
        style={{
          position: "fixed",
          marginLeft: "0",
          bottom: "16px",
          right: "16px",
          background: "var(--button-color)",
          width: "44px",
          height: "44px",
        }}
      />
    </div>
  );
};

export default ProfileNft;
