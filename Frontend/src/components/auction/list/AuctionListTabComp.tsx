import { Route } from "react-router-dom";
import { useDispatch } from 'react-redux'


import TabComp from "components/common/tab/TabComp";
import AuctionListNew from './AuctionListNew';
import AuctionListPopular from './AuctionListPopular';
import AuctionListDeadline from './AuctionListDeadline';

import styles from "./AuctionListTabComp.module.css";

const AuctionListTabComp: React.FC = () => {
  const tabItems = [
    { name: "최신순", path: "/auction-list/type=new" },
    { name: "인기순", path: "/auction-list/type=popular" },
    { name: "마감임박순", path: "/auction-list/type=deadline" },
  ];

  return (
    <div className={styles.tabContainer}>
      <TabComp items={tabItems}>
        <Route path="/type=new" element={<AuctionListNew />} />
        <Route path="/type=popular" element={<AuctionListPopular />} />
        <Route path="/type=deadline" element={<AuctionListDeadline />} />
      </TabComp>
    </div>
  );
};

export default AuctionListTabComp;
