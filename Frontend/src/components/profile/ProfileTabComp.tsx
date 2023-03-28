import { Route, useLocation } from "react-router-dom";

import TabComp from "components/common/TabComp";

import { memeType } from "store/memeList";
import { auctionType } from "store/auctionList";

import ProfileNft from "./ProfileNft";
import ProfileAuction from "./ProfileAuction";

import styles from "./ProfileTabComp.module.css";

interface Props {
  nickname: string;
  auction_id: string|null;
  nftList: memeType[];
  auctionList: auctionType[];
}

const ProfileTabComp: React.FC<Props> = ({
  nickname,
  nftList,
  auctionList,
  auction_id
}) => {
  const location = useLocation();
  const tabItems = location.pathname.includes("/auction")
    ? [
        { name: "NFT", path: `/auction/${auction_id}/${nickname}/tab=nft` },
        { name: "경매", path: `/auction/${auction_id}/${nickname}/tab=auction` },
      ]
    : [
        { name: "NFT", path: `/profile/${nickname}/tab=nft` },
        { name: "경매", path: `/profile/${nickname}/tab=auction` },
      ];

  return (
    <div className={styles.tabContainer}>
      <TabComp items={tabItems}>
        <Route path="/tab=nft" element={<ProfileNft nftList={nftList} />} />
        <Route path="/tab=auction" element={<ProfileAuction auctionList={auctionList} />}
        />
      </TabComp>
    </div>
  );
};

export default ProfileTabComp;
