import React, { useEffect, useState } from "react";
import useAxios from "hooks/useAxios";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/configStore";
import { auctionUploadActions, submitMeme } from "store/auctionUpload";
import { memeList } from "store/auctionUpload";

import {
  Dropdown,
  DropdownChangeEvent,
  DropdownProps,
} from "primereact/dropdown";
import { Avatar } from "primereact/avatar";

import styles from "components/auction/upload/UploadDropDown.module.css";

interface UploadDropDownProps {
  visible: boolean
}

const UploadDropDown: React.FC<UploadDropDownProps> = ({visible}) => {
  const dispatch = useDispatch();
  const [selectedMeme, setSelectedMeme] = useState<memeList | null>(null);
  // 내가 선택한 밈 id
  // 내가 보유하는 밈 리스트
  const { data: myMemeList, sendRequest } = useAxios();
  const userId = JSON.parse(sessionStorage.getItem("user")!).userId;
  // 만약 상세페이지에서 왔을때

  const { memeId } = useSelector<RootState, submitMeme>(
    (state) => state.auctionUpload.submitMeme
  );
  
  useEffect(() => {
    sendRequest({url:`/api/mpoffice/meme/memeList?userId=${userId}`});
  }, [visible]);

  useEffect(()=>{
    if (memeId && myMemeList) {
      for (let i = 0; i < myMemeList.length; i++) {
        if (myMemeList[i].id === memeId) {
          setSelectedMeme(myMemeList[i]);
        }
      }
    }
  },[myMemeList])

  // 드랍다운 템플릿
  const selectedMemeTemplate = (option: memeList, props: DropdownProps) => {
    if (option) {
      return (
        <div className={styles.optionItem}>
          <Avatar className={styles.memeImg} image={option.imgUrl} />
          <div className={styles.optionTitle}>{option.title}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const optionMemeTemplate = (option: memeList) => {
    return (
      <div className={styles.optionItem}>
        <Avatar className={styles.memeImg} image={option.imgUrl} />
        <div className={styles.optionTitle}>{option.title}</div>
      </div>
    );
  };

  return (
    <>
      {myMemeList && (
        <Dropdown
          className={styles.dropdown}
          placeholder="등록할 밈을 선택하세요"
          value={selectedMeme}
          options={myMemeList}
          optionLabel="title"
          onChange={(e: DropdownChangeEvent) => {
            setSelectedMeme(e.value);
            dispatch(auctionUploadActions.selectMeme(e.value.id));
          }}
          valueTemplate={selectedMemeTemplate}
          itemTemplate={optionMemeTemplate}
          panelClassName={styles.panel}
        />
      )}
    </>
  );
};

export default UploadDropDown;
