import { Route } from "react-router-dom";

import TabComp from "components/common/tab/TabComp";
import MemeListNew from "./MemeListNew";
import MemeListPopular from "./MemeListPopular";

import styles from "./MemeListTabComp.module.css";

const MemeListTabComp: React.FC = () => { 
  const tabItems = [
    { name: "최신순", path: "/meme-list/type=new" },
    { name: "인기순", path: "/meme-list/type=popular" },
  ];

  return (
    <div className={styles.tabContainer}>
      <TabComp items={tabItems}>
        <Route path="/type=new" element={<MemeListNew />} />
        <Route path="/type=popular" element={<MemeListPopular />} />
      </TabComp>
    </div>
  );
};

export default MemeListTabComp;
