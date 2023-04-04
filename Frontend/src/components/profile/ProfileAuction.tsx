import NftAuctionCard from "components/common/card/NftAuctionCard";
import { auctionCardType } from "store/auction";
import { ScrollTop } from "primereact/scrolltop";
import styles from "./ProfileTabComp.module.css";

interface Props {
  auctionList: auctionCardType[];
}

const ProfileAuction: React.FC<Props> = ({ auctionList }) => {
  return (
    <div className={styles.cardContainer}>
      {/*  nft 없는 경우 */}
      {auctionList.length === 0 && (
        <div className={styles.notContent}>진행중인 경매가 없습니다.</div>
      )}

      {auctionList.map((auction) => {
        return <NftAuctionCard key={auction.memeId} items={auction} />;
      })}

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

export default ProfileAuction;
