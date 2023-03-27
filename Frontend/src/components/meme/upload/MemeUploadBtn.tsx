import axios from 'axios';
import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import memeUpload, { memeUploadActions } from "store/memeUpload";
import { RootState } from "store/configStore";
import SubmitBtn from "components/common/SubmitBtn";
import CheckingModal from "components/auction/upload/CheckingModal";

import styles from "./MemeUploadBtn.module.css";

// meme-upload page에서 submit 하는 버튼
const MemeUploadBtn: React.FC = () => {
  const dispatch = useDispatch();
  const title = useSelector<RootState, string>((state) => state.memeUpload.title);
  const titleChecked = useSelector<RootState, boolean>((state) => state.memeUpload.titleChecked);
  const titleState = useSelector<RootState, number>((state) => state.memeUpload.titleState);
  const imgUrl = useSelector<RootState, string>((state) => state.memeUpload.imgUrl);
  const imgState = useSelector<RootState, number>((state) => state.memeUpload.imgState);
  const info = useSelector<RootState, string>((state) => state.memeUpload.info);
  const infoState = useSelector<RootState, number>((state) => state.memeUpload.infoState);
  const situation = useSelector<RootState, string>((state) => state.memeUpload.situation);
  const situationState = useSelector<RootState, number>((state) => state.memeUpload.situationState);
  const checkbox = useSelector<RootState, boolean>((state) => state.memeUpload.checkbox);

  // 유효성 검사 모달
  const [checkInput, setCheckInput] = useState("");
  const [checkModalVisible, setCheckModalVisible] = useState<boolean>(false);
  const controlCheckModal = (visible: boolean) => {
    setCheckModalVisible(visible);
  };
  

  // 유효성검사 관련 변수
  const apiEndpoint = process.env.REACT_APP_CM_ENDPOINT;
  const apiToken = process.env.REACT_APP_CM_KEY;



  // 텍스트 유효성 검사 함수
  const textMonitor = async (textInput: string) => {
    const textParams = {
      "autocorrect": "false",
      "PII": "false",
      "listId": "false",
      "classify": "false",
      "language": "kor",
    }
    console.log(`${apiEndpoint}/contentmoderator/moderate/v1.0/ProcessText/Screen?${textParams}`)
    
    const config = {
        method: 'POST',
        data: textInput,
        headers: {
            'Content-Type': 'text/plain',
            'Ocp-Apim-Subscription-Key': apiToken
        },
        url: `${apiEndpoint}/contentmoderator/moderate/v1.0/ProcessText/Screen?${textParams}`
    };

    try {
        const {data} = await axios(config);
        console.log('term', data.Terms)       // 욕설 포함된 경우 data에 Term 포함되어 있음
        if (data.Terms) {
          return 0     // 유해성 통과 x
        } else {
          return 1     // 유해성 통과 o
        };             
    } catch (error) {
        console.log(error);
        return 0;
    }
};

  // 이미지 유효성 검사 함수
  // 작성해야함



  // click하면 input 확인 -> 유해성검사 -> nft 등록 / 백 api
  const uploadHandler = async () => {
    // title 중복검사 통과 + 나머지 모든 값 존재 시에만 upload
    if (!(titleChecked && imgUrl && info && situation && checkbox)) {
      alert("입력값을 확인하세요.");
      return;
    }
    const wait = (time:number, ) => new Promise((textMonitor)=> setTimeout(textMonitor,time))
    // 유해성 검사 test중
    controlCheckModal(true);
    const titleMonitor = await wait(1000)
    console.log(1)
    const infoMonitor = await textMonitor(info)
    const situationMonitor = await textMonitor(situation)
    dispatch(memeUploadActions.setTitleState(titleMonitor))
    dispatch(memeUploadActions.setInfoState(infoMonitor))
    dispatch(memeUploadActions.setSituationState(situationMonitor))
    controlCheckModal(false);
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
        textInput={`${checkInput} 유효성검사 중입니다.`}
      />
    </>
  );
};

export default MemeUploadBtn;
