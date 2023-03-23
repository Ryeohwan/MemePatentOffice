import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { auctionListActions } from "store/auctionList";

import NftAuctionCard from "components/common/NftAuctionCard";
import styles from "./AuctionListTabComp.module.css";

type auctionType = {
  meme_id: number;
  auction_id: number;
  title: string;
  time: string;
  highest_bid: number;
  imgUrl: string;
}

const AuctionListPopular: React.FC = () => {
  const dispatch = useDispatch();
  const auctionList = useSelector<RootState, auctionType[]>(
    (state) => state.auctionList.auctionPopularList
  );

  // console.log(memeList);

  return (
    <div className={styles.auctionListCardContainer}>
      {auctionList.map((auction) => {
        return <NftAuctionCard key={auction.meme_id} items={auction} />;
      })}
    </div>
  );
};

export default AuctionListPopular;