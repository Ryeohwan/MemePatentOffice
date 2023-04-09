// meme list page (/meme-list)
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";

import MemeListSearch from "components/meme/list/MemeListSearch";
import NotInputArea from "components/meme/list/NotInputArea";
import MemeListTabComp from "components/meme/list/MemeListTabComp";
import MemeAddBtn from "components/meme/list/MemeAddBtn";
import MemeNotFound from "components/meme/list/MemeNotFound";
import uploadMemeImg from "assets/uploadmeme.jpg"
import styles from "./MemeListPage.module.css";


const MemeListPage: React.FC = () => {
  const input = useSelector<RootState, string>((state) => state.memeList.input);
  const firstLoading = useSelector<RootState, boolean>((state) => state.memeList.loadingMemeList);
  const newResult = useSelector<RootState, boolean|null>((state) => state.memeList.newListResult);
  const popularResult = useSelector<RootState, boolean|null>((state) => state.memeList.popularListResult);

  return (
    <div className={styles.pageContainer}>
      {/* <p className={styles.pageHeader}>밈 사전</p> */}

      {/* input값 없는 경우 -> 햄버거/밈사전으로 들어온 경우 */}
      {!input && (
        // <div className={styles.notInputTxt}>
        //   설명글입니다. 설명글입니다. 설명글입니다. 설명글입니다. 설명글입니다.
        //   설명글입니다. 설명글입니다. 설명글입니다.
        // </div>
        <img src={uploadMemeImg} alt="" className={styles.uploadMemeImg} />
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
      {input && !firstLoading && newResult && popularResult && (
        <>
          {/* 검색 결과 tab */}
          <MemeListTabComp />
        </>
      )}
     
     {/* 검색 결과 false인 경우 -> random 밈 몇개 띄워주기 */}
      {input && !firstLoading && (newResult === false || popularResult === false) &&  (
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
