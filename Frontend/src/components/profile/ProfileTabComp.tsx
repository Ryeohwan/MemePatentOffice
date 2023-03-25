import { Route } from "react-router-dom";

import TabComp from "components/common/TabComp";

import { memeType } from "store/memeList";
import { auctionType } from "store/auctionList";

import ProfileNft from "./ProfileNft";
import ProfileAuction from "./ProfileAuction";

import styles from "./ProfileTabComp.module.css";


interface Props {
    nickname: string;
    nftList: memeType[];
    auctionList: auctionType[];
}


const ProfileTabComp: React.FC<Props> = ({nickname, nftList, auctionList}) => {
 
  const tabItems = [
    { name: "NFT", path: `/profile/${nickname}/tab=nft` },
    { name: "경매", path: `/profile/${nickname}/tab=auction` },
  ];

  return (
    <div className={styles.tabContainer}>
      <TabComp items={tabItems}>
        <Route path="/tab=nft" element={<ProfileNft nftList={nftList}/>} />
        <Route path="/tab=auction" element={<ProfileAuction auctionList={auctionList}/>} />
      </TabComp>
    </div>
  );
};

export default ProfileTabComp;
