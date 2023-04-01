// meme list page (/meme-list)
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store/configStore";
import { useAppDispatch } from "hooks/useAppDispatch";
import { memeListActions, getMemeNewListAxiosThunk, getMemePopularListAxiosThunk } from "store/memeList";

import MemeListSearch from "components/meme/list/MemeListSearch";
import NotInputArea from "components/meme/list/NotInputArea";
import MemeListTabComp from "components/meme/list/MemeListTabComp";
import MemeAddBtn from "components/meme/list/MemeAddBtn";
import MemeNotFound from "components/meme/list/MemeNotFound";
import styles from "./MemeListPage.module.css";


const MemeListPage: React.FC = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const input = useSelector<RootState, string>((state) => state.memeList.input);
  const range = useSelector<RootState, string>((state) => state.memeList.range);
  const firstLoading = useSelector<RootState, boolean>((state) => state.memeList.loadingMemeList);

  const result = useSelector<RootState, boolean|null>((state) => state.memeList.result);

  // 디테일 -> 뒤로가기 했을때 데이터 살려놓으려면 고쳐야할듯....
  // unmount시 redux reset 시키기
  useEffect(() => {
    return () => {
      dispatch(memeListActions.resetAll());
    };
  }, []);

  // input 변경시 get axios dispatch (lastPost = -1 시작 의미), 둘다 보냄
  useEffect(() => {
    if (!input) return;
    console.log("new list get!", input);
    appDispatch(getMemeNewListAxiosThunk(input, -1));
    // appDispatch(getMemePopularListAxiosThunk(input, range, -1))
  }, [input]);


  return (
    <div className={styles.pageContainer}>
      <p className={styles.pageHeader}>밈 사전</p>

      {/* input값 없는 경우 -> 햄버거/밈사전으로 들어온 경우 */}
      {!input && (
        <div className={styles.notInputTxt}>
          설명글입니다. 설명글입니다. 설명글입니다. 설명글입니다. 설명글입니다.
          설명글입니다. 설명글입니다. 설명글입니다.
        </div>
      )}

      <MemeListSearch />

      {/* input값 없는 경우 */}
      {!input && (
        // 등록된 밈 수 + 인기 검색어
        <NotInputArea />
      )}

      {/* 첫 loading인 경우 */}
      {input && firstLoading && (
        <div className={styles.loadingContainer}>
          loading중 ...
        </div>
      )}

      {/* 검색 결과 true인 경우  */}
      {input && !firstLoading && result && (
        <>
          {/* 검색 결과 tab */}
          <MemeListTabComp />
        </>
      )}
     
     {/* 검색 결과 false인 경우 -> random 밈 몇개 띄워주기 */}
      {input && !firstLoading && result === false &&  (
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
