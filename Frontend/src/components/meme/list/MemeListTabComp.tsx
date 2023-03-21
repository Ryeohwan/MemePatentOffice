import { Route, Routes } from "react-router-dom";
import { RouteObject, useRoutes } from "react-router-dom";

import TabComp from "components/common/TabComp";
import styles from "./MemeListTabComp.module.css";
import MemeListNew from "./MemeListNew";
import MemeListPopular from "./MemeListPopular";

const MemeListTabComp: React.FC = () => {
  const tabItems = [
    { name: "최신순", path: "/meme-list?type=new" },
    { name: "인기순", path: "/meme-list?type=popular" },
  ];

  // const routeItmes: React.FC = () => {
  //   return (
  //    <Routes>
  //       <Route path="/meme-list?type=new" element={<MemeListNew />}/>
  //       <Route path="/meme-list?type=popular" element={<MemeListPopular />}/>
  //    </Routes>
  //   )
  // }

  const routes: RouteObject[] = [
    {
      path: "/meme-list?type=new",
      element: <MemeListNew />,
    },
    {
      path: "/meme-list?type=popular",
      element: <MemeListPopular />,
    },
  ];

  return (
    <div className={styles.tabContainer}>
      <TabComp items={tabItems} routes={routes}>
        {/* <Route path="/meme-list?type=new" element={<MemeListNew />} />
        <Route path="/meme-list?type=popular" element={<MemeListPopular />} /> */}
      </TabComp>
    </div>
  );
};

export default MemeListTabComp;
