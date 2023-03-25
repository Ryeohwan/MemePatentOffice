// meme list page (/meme-list)
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store/configStore";
import { memeListActions } from "store/memeList";

import MemeListSearch from "components/meme/list/MemeListSearch";
import NotInputArea from "components/meme/list/NotInputArea";
import MemeListTabComp from "components/meme/list/MemeListTabComp";
import MemeAddBtn from "components/meme/list/MemeAddBtn"
import styles from "./MemeListPage.module.css";

const MemeListPage: React.FC = () => {
  const dispatch = useDispatch();
  const input = useSelector<RootState, string>((state) => state.memeList.input);

  // redux에서

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

      {/* input값 있는 경우 -> 네브 검색으로 들어온 경우  */}
      {input && (
        <>
          {/* 검색 결과 tab */}
          <MemeListTabComp />
        </>
      )}

      {/* input값 있는데 검색 결과 없는 경우 -> random 밈 몇개 띄워주기 */}

      {/* 밈 등록 버튼 */}
      <MemeAddBtn />
    
    </div>
  );
};

export default MemeListPage;
