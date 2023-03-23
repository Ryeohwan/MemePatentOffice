import { Route, Routes } from "react-router-dom";
import { RouteObject, useRoutes } from "react-router-dom";

import MemeListNew from "./MemeListNew";
import MemeListPopular from "./MemeListPopular";

import styles from "./MemeListTabComp.module.css";
import TabComp from "components/common/TabComp";

const MemeListTabComp: React.FC = () => {
  const tabItems = [
    { name: "최신순", path: "/meme-list/type=new" },
    { name: "인기순", path: "/meme-list/type=popular" },
    { name: "기타", path: "/meme-list/type=ddd" },
  ];

  return (
    <div className={styles.tabContainer}>
      <TabComp items={tabItems}>
        <Route path="/type=new" element={<MemeListNew />} />
        <Route path="/type=popular" element={<MemeListPopular />} />
        <Route path="/type=ddd" element={<MemeListNew />} />
      </TabComp>
    </div>
  );
};

export default MemeListTabComp;
