import { useEffect } from "react";
import useAxios from "hooks/useAxios";
import { auctionCardType } from "store/auction";
import SkeletonCard from "components/common/card/SkeletonCard";
import NftAuctionCard from "components/common/card/NftAuctionCard";
import { ScrollTop } from "primereact/scrolltop";
import styles from "./AuctionListTabComp.module.css";

const AuctionListNew: React.FC = () => {
  const { data, status, isLoading, sendRequest } = useAxios();

  useEffect(() => {
    console.log("new get!");
    sendRequest({ url: `/api/auction/list?sort=latest` });
  }, []);

  return (
    <div className={styles.auctionListCardContainer}>
      {/* loading 중 */}
      {isLoading && <SkeletonCard />}

      {/* data 없는 경우 */}
      {status === 200 && data.length === 0 && (
        <div className={styles.noContentContainer}>
          현재 등록된 경매가 없습니다.
        </div>
      )}

      {/* data 들어온 경우 */}
      {status === 200 &&
        data.length > 0 &&
        data.map((auction: auctionCardType) => {
          return <NftAuctionCard key={auction.auctionId} items={auction} />;
        })}

      <ScrollTop
        target="parent"
        threshold={100}
        icon="pi pi-arrow-up text-base"
        style={{
          position: "fixed",
          marginLeft: "0",
          bottom: "10%",
          right: "16px",
          background: "var(--button-color)",
          width: "44px",
          height: "44px",
        }}
      />
    </div>
  );
};

export default AuctionListNew;
