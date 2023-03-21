import { Route, Routes } from "react-router-dom";
import { RouteObject, useRoutes } from "react-router-dom";

import TabNavComp from "./TabNavComp";
import styles from "./TabComp.module.css";

interface TabItem {
  name: string;
  path: string;
}

interface Props {
  items: TabItem[];
  routes: RouteObject[];
  children: React.ReactNode;
}

const TabComp: React.FC<Props> = ({ items, routes }) => {
  const routing = useRoutes(routes);
  console.log(routes)
  console.log(routing)

  // console.log(children);

  return (
    <>
      <div className={styles.tabNavContainer}>
        <TabNavComp items={items} />
      </div>
      <div className={styles.tabRouteContainer}>
        <Routes>
          {routing}
        </Routes>
      </div>
    </>
  );
};

export default TabComp;
