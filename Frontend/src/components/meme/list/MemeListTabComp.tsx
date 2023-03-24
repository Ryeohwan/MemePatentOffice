import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import { Route } from "react-router-dom";

import {useDispatch, useSelector} from 'react-redux'
import { RootState } from 'store/configStore'
import { memeListActions } from 'store/memeList'

import TabComp from "components/common/TabComp";
import MemeListNew from "./MemeListNew";
import MemeListPopular from "./MemeListPopular";

import styles from "./MemeListTabComp.module.css";
import NotFoundPage from 'pages/NotFoundPage';

const MemeListTabComp: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  
  const tabItems = [
    { name: "최신순", path: "/meme-list/type=new" },
    { name: "인기순", path: "/meme-list/type=popular?range=today" },
  ];

  // location 변할때마다 get 해오기
  // useEffect(() => {
  //   if (location.pathname === "/meme-list/type=new") {dispatch(memeListActions.changeType({type: ''}))}
  //   else {dispatch(memeListActions.changeType({type: 'popular'}))}
  // }, [location])

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
