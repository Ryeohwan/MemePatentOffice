import axios, { AxiosError } from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memeUploadActions } from "store/memeUpload";
import { RootState } from "store/configStore";
import SubmitBtn from "components/common/elements/SubmitBtn";
import CheckingModal from "components/auction/upload/CheckingModal";

import styles from "./MemeUploadBtn.module.css";

// meme-upload page에서 submit 하는 버튼
const MemeUploadBtn: React.FC = () => {
  const dispatch = useDispatch();
  const title = useSelector<RootState, string>((state) => state.memeUpload.title);
  const titleChecked = useSelector<RootState, boolean|null>((state) => state.memeUpload.titleChecked);
  const titleState = useSelector<RootState, number>((state) => state.memeUpload.titleState)
  const titleMonitor = useRef<number|null>(null)

  const imgUrl = useSelector<RootState, string>((state) => state.memeUpload.imgUrl);
  const imgState = useSelector<RootState, number>((state) => state.memeUpload.imgState);
  let imgMonitor= useRef<number|null>(null)

  const info = useSelector<RootState, string>((state) => state.memeUpload.info);
  const infoState = useSelector<RootState, number>((state) => state.memeUpload.infoState);
  let infoMonitor= useRef<number|null>(null)

  const situation = useSelector<RootState, string>((state) => state.memeUpload.situation);
  const situationState = useSelector<RootState, number>((state) => state.memeUpload.situationState);
  let situationMonitor= useRef<number|null>(null)

  const checkbox = useSelector<RootState, boolean>((state) => state.memeUpload.checkbox);

  // 유효성 검사 모달 관련
  const [modalTxt, setModalTxt] = useState("");
  const [checkModalVisible, setCheckModalVisible] = useState<boolean>(false);
  const controlCheckModal = (visible: boolean) => {
    setCheckModalVisible(visible);
  };

  // 유효성검사 (AZURE) 관련 변수
  const apiEndpoint = process.env.REACT_APP_CM_ENDPOINT;
  const apiToken = process.env.REACT_APP_CM_KEY;

  // 텍스트 유효성 검사 함수
  const textMonitor = async (textInput: string) => {
    console.log(textInput, '검사 보냄')
    const textParams = {
      autocorrect: "false",
      PII: "false",
      listId: "false",
      classify: "false",
      language: "kor",
    };
    const config = {
      method: "POST",
      data: textInput,
      headers: {
        "Content-Type": "text/plain",
        "Ocp-Apim-Subscription-Key": apiToken,
      },
      url: `${apiEndpoint}/contentmoderator/moderate/v1.0/ProcessText/Screen?${textParams}`,
    };
    try {
      const { data } = await axios(config);
      console.log("term", data.Terms); // 욕설 포함된 경우 data에 Term 포함되어 있음
      if (data.Terms) {
        return 0; // 유해성 통과 x
      } else {
        return 1; // 유해성 통과 o
      }
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      console.log('error here', response)
      // 접속자수 많은 axios error난 경우
      if (response!.status === 429) {
        return -2
      }
      return 0;
    }
  };

  // 이미지 유효성 검사 함수
  const imageMonitor = async (imageUrl: string) => {
    console.log(imageUrl);

    // data url -> file 변환
    const arrOne = imageUrl.split(",");
    const arrTwo = arrOne[0].match(/:(.*?);/);
    const mime = arrTwo![1];
    const bstr = atob(arrOne[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], "test", { type: mime });

    const config = {
      method: "POST",
      data: file,
      headers: {
        "Content-Type": mime,
        "Ocp-Apim-Subscription-Key": apiToken,
      },
      url: `${apiEndpoint}/contentmoderator/moderate/v1.0/ProcessImage/Evaluate`,
    };

    try {
      const { data } = await axios(config);
      console.log(data);
      if (data.IsImageAdultClassified || data.IsImageRacyClassified) {
        return 0; // 유해성 통과 x
      } else {
        return 1; // 유해성 통과 o
      }
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      console.log('error here', response)
      // 접속자수 많은 axios error난 경우
      if (response!.status === 429) {
        return -2
      }
      return 0;
    }
  };


  // click하면 input 확인 -> 유해성검사 -> nft 등록 / 백 api
  const uploadHandler = async () => {
    // title 중복검사 통과 + 나머지 모든 값 존재 시에만 upload
    if (!(titleChecked && imgUrl && info && situation && checkbox)) {
      alert("입력값을 확인하세요.");
      return;
    }

    // 유해성검사 -> 통과 못한 항목에 대해서만 진행 (state: -2 / -1 / 0)
    controlCheckModal(true);  // modal 띄우기
    
    if (titleState < 1) {
      setModalTxt("제목 유해성 검사중...");
      // console.log('여기', await textMonitor(title))
      titleMonitor.current = await textMonitor(title);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    
    if (imgState < 1) {
      setModalTxt("이미지 유해성 검사중...");
      imgMonitor.current = await imageMonitor(imgUrl);
      await new Promise((resolve) => setTimeout(resolve, 2000));   
    }
    
    if (infoState < 1) {
      setModalTxt("뜻 유해성 검사중...");
      infoMonitor.current = await textMonitor(info);
      await new Promise((resolve) => setTimeout(resolve, 1500));        
    }

    if (situationState < 1) {
      setModalTxt("상황 유해성 검사중...");
      situationMonitor.current = await textMonitor(situation);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
    
    dispatch(memeUploadActions.setTitleState(titleMonitor.current));
    dispatch(memeUploadActions.setImgState(imgMonitor.current));
    dispatch(memeUploadActions.setInfoState(infoMonitor.current));
    dispatch(memeUploadActions.setSituationState(situationMonitor.current));

    // 동시에 시도해서 axios error난 경우
    if (titleMonitor.current === -2 || imgMonitor.current === -2 || infoMonitor.current === -2 || situationMonitor.current === -2) {
      controlCheckModal(false);
      alert('잠시후 다시 시도해주세요..');
      return;
    }


    // 유해성 검사 모두 통과한 경우
    if (titleMonitor.current! > 0 && imgMonitor.current! > 0 && infoMonitor.current! > 0 && situationMonitor.current! > 0) {
      // nft 등록
      setModalTxt("NFT 등록중...");
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // 백에 api 보내기


      // 밈 상세로 navigate
      
      
      controlCheckModal(false);

      // 임시 ALERT
      alert("임시 nft 등록 성공!");
    } else {
      // 하나라도 유해성검사 통과 못한 경우
      controlCheckModal(false);
    }
  };

  return (
    <>
      <div className={styles.uploadBtnContainer}>
        <div className={styles.btnContainer} onClick={uploadHandler}>
          <SubmitBtn />
        </div>
      </div>
      <CheckingModal
        checkModalVisible={checkModalVisible}
        controlCheckModal={controlCheckModal}
        textInput={modalTxt}
      />
    </>
  );
};

export default MemeUploadBtn;
