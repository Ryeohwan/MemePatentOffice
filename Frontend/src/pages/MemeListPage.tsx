import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store/configStore";
import { memeListActions } from "store/memeList";

// meme list page (/meme-list)
import MemeListSearch from "components/meme/list/MemeListSearch";
import SearchRankingComp from "components/meme/list/SearchRankingComp";
import MemeListTabComp from "components/meme/list/MemeListTabComp";
import styles from "./MemeListPage.module.css";

const MemeListPage: React.FC = () => {
  const dispatch = useDispatch();
  const input = useSelector<RootState, string>((state) => state.memeList.input);

  // unmount시 redux에 input ""로 바꾸기
  useEffect(() => {
    return () => {
      dispatch(memeListActions.changeInputTxt(""));
    };
  }, []);


  useEffect(() => {
    if (input) return
  })




  return (
    <div className={styles.pageContainer}>
      <p className={styles.pageHeader}>밈 사전</p>
      <MemeListSearch />

      {/* input값 없는 경우 -> 햄버거/밈사전으로 들어온 경우 */}
      {!input && (
        <>
          {/* 실시간 검색어 */}
          <SearchRankingComp />
        </>
      )}

      {/* input값 있는 경우 -> 네브 검색으로 들어온 경우  */}
      {input && (
        <>
          {/* 검색 결과 tab */}
          <MemeListTabComp />
        </>
      )}

      {/* input값 있는데 검색 결과 없는 경우 -> page에서 처리할건지 tabcomp에서 처리할건지 고민 */}
    </div>
  );
};

export default MemeListPage;
