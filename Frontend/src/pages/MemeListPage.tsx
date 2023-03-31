// meme list page (/meme-list)
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store/configStore";
import { memeListActions } from "store/memeList";
import { memeType } from "store/memeList";

import MemeListSearch from "components/meme/list/MemeListSearch";
import NotInputArea from "components/meme/list/NotInputArea";
import MemeListTabComp from "components/meme/list/MemeListTabComp";
import MemeAddBtn from "components/meme/list/MemeAddBtn";
import MemeNotFound from "components/meme/list/MemeNotFound";
import styles from "./MemeListPage.module.css";


const MemeListPage: React.FC = () => {
  const dispatch = useDispatch();
  const input = useSelector<RootState, string>((state) => state.memeList.input);
  const memeList = useSelector<RootState, memeType[]>((state) => state.memeList.memeNewList);
  const result = useSelector<RootState, boolean|null>((state) => state.memeList.result);

  console.log('page 임니다', memeList);
  
  // unmount시 redux에 input ""로 바꾸기
  useEffect(() => {
    return () => {
      dispatch(memeListActions.changeInputTxt(""));
    };
  }, []);


  return (
    <div className={styles.pageContainer}>
      <p className={styles.pageHeader}>밈 사전</p>

      {/* input값 없는 경우 설명 글 */}
      {!input && (
        <div className={styles.notInputTxt}>
          설명글입니다. 설명글입니다. 설명글입니다. 설명글입니다. 설명글입니다.
          설명글입니다. 설명글입니다. 설명글입니다.
        </div>
      )}

      <MemeListSearch />

      {/* input값 없는 경우 -> 햄버거/밈사전으로 들어온 경우 */}
      {!input && (
        // 등록된 밈 수 + 인기 검색어
        <NotInputArea />
      )}

      {/* input값 있고 검색 결과 true인 경우  */}
      {input && result && (
        <>
          {/* 검색 결과 tab */}
          <MemeListTabComp />
        </>
      )}
     
     {/* 검색 결과 false인 경우 -> random 밈 몇개 띄워주기 */}
      {input && result === false &&  (
        <>
          <MemeNotFound />
        </>
      )}

      {/* 밈 등록 버튼 */}
      <MemeAddBtn />
    </div>
  );
};

export default MemeListPage;
