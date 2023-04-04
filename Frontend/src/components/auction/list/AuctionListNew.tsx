import { useEffect } from "react";
import useAxios from "hooks/useAxios";
import { auctionCardType } from "store/auction";
import NftAuctionCard from "components/common/card/NftAuctionCard";
import styles from "./AuctionListTabComp.module.css";
import SkeletonCard from "components/common/card/SkeletonCard";

const AuctionListNew: React.FC = () => {
  const { data, status, isLoading, sendRequest } = useAxios();

  useEffect(() => {
    console.log('new get!')
    sendRequest({ url: `/api/auction/list?sort=latest` });
  }, []);


  return (
    <div className={styles.auctionListCardContainer}>
      {/* loading 중 */}
      {isLoading && (
        <SkeletonCard />
      )}

      {/* data 없는 경우 */}
      {status === 200 && data.length === 0 && (
        <div className={styles.noContentContainer}>
          현재 등록된 경매가 없습니다.
        </div>
      )}

      {/* data 들어온 경우 */}
      {status === 200 && data.length > 0 && (
        data.map((auction: auctionCardType) => {
          return <NftAuctionCard key={auction.auctionId} items={auction} />;
        })
      )}

    </div>
  );
};

export default AuctionListNew;
