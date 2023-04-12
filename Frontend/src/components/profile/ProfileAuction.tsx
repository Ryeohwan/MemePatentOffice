import {useEffect} from 'react';
import useAxios from 'hooks/useAxios';
import { auctionCardType } from "store/auction";
import SkeletonCard from 'components/common/card/SkeletonCard';
import NftAuctionCard from "components/common/card/NftAuctionCard";

import { ScrollTop } from "primereact/scrolltop";
import styles from "./ProfileTabComp.module.css";

interface Props {
  nickname: string;
}

const ProfileAuction: React.FC<Props> = ({ nickname }) => {
  // 경매 api 아직 안나왔음
  const {data, status, isLoading, sendRequest} = useAxios();

  useEffect(() => {
    sendRequest({url: `/api/auction/list?userNickname=${nickname}`})
  }, [])
  
  return (
    <div className={styles.cardContainer}>
      {/* loading 중 */}
      {isLoading && <SkeletonCard />}

      {/* 진행중인 경매 없는 경우 */}
      {!isLoading && status === 200 && data.length === 0 && (
        <div className={styles.notContent}>진행중인 경매가 없습니다.</div>
      )}

      {/* 경매 있는 경우 */}
      {!isLoading && status === 200 && data.length > 0 && (
        data.map((auction: auctionCardType) => {
          return <NftAuctionCard key={auction.memeId} items={auction} />;
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
          background: "var(--navy-color)",
          width: "44px",
          height: "44px",
        }}
      />
    </div>
  );
};

export default ProfileAuction;
