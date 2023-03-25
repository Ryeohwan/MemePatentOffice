import React, {useState} from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/configStore";
import { auctionUploadActions } from "store/auctionUpload";
import { memeList } from "store/auctionUpload";

import { Dropdown, DropdownChangeEvent, DropdownProps } from "primereact/dropdown";
import { Avatar } from "primereact/avatar";

import styles from "components/auction/upload/UploadDropDown.module.css";

const UploadDropDown: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedMeme,setSelectedMeme] = useState<memeList|null>(null)
  // 내가 선택한 밈 id
  console.log(selectedMeme)
  // 내가 보유하는 밈 리스트
  const myMemeList = useSelector<RootState, memeList[]>(
    (state) => state.auctionUpload.memeList
  );

  // 드랍다운 템플릿
  const selectedMemeTemplate = (option: memeList,props:DropdownProps) => {
    if (option) {
      return (
        <div className={styles.optionItem}>
          <Avatar className={styles.memeImg} image={option.imgSrc} />
          <div className={styles.optionTitle}>{option.title}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>
  };

  const optionMemeTemplate = (option: memeList) => {
    return (
      <div className={styles.optionItem}>
        <Avatar className={styles.memeImg} image={option.imgSrc} />
        <div className={styles.optionTitle}>{option.title}</div>
      </div>
    );
  };

  return (
    <>
      <Dropdown
        className={styles.dropdown}
        placeholder="등록할 밈을 선택하세요"
        value={selectedMeme}
        options={myMemeList}
        optionLabel="title"
        onChange={(e: DropdownChangeEvent) => {
          setSelectedMeme(e.value)
          dispatch(auctionUploadActions.selectMeme(e.value.id));
        }}
        valueTemplate={selectedMemeTemplate}
        itemTemplate={optionMemeTemplate}
      />
    </>
  );
};

export default UploadDropDown;
