import { memeType } from "store/memeList";
import NftCard from "components/common/card/NftCard";

import styles from "./ProfileNft.module.css";

interface Props {
  nftList: memeType[];
}

const ProfileNft: React.FC<Props> = ({ nftList }) => {
  return (
    <div className={styles.nftContainer}>
      
      {/* 여기 design 추후 수정해야할듯 글자 위로 올리든가 */}
      {/* 소유한 nft 없는 경우 */}
      {nftList.length === 0 && <div>소유한 nft가 없습니다.</div>}

      {nftList.map((nft) => {
        return <NftCard key={nft.id} items={nft} />;
      })}
    
    </div>
  );
};

export default ProfileNft;
