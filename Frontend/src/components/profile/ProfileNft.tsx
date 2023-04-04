import { memeType } from "store/memeList";
import NftCard from "components/common/card/NftCard";
import { ScrollTop } from "primereact/scrolltop";
import styles from "./ProfileTabComp.module.css";

interface Props {
  nftList: memeType[];
}

const ProfileNft: React.FC<Props> = ({ nftList }) => {
  return (
    <div className={styles.cardContainer}>
      {/* 소유한 nft 없는 경우 */}
      {nftList.length === 0 && (
        <div className={styles.notContent}>소유한 nft가 없습니다.</div>
      )}

      {nftList.map((nft) => {
        return <NftCard key={nft.id} items={nft} />;
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

export default ProfileNft;
