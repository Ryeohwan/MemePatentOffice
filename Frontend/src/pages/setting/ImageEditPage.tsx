// 프로필사진 수정 page (/setting/user-edit/image)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "hooks/useAxios";

import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";

import "pages/setting/Setting.css";
import styles from "pages/setting/ImageEditPage.module.css";

const LOGO_IMG_URL = "https://storage.googleapis.com/mpoffice/Logo.png"

const ImageEditPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedImg, setSelectedImg] = useState<number>(-1);
  const [selectedImgSrc, setSelectedImgSrc] = useState<string | null>(null);

  const {data, isLoading, sendRequest} = useAxios();

  useEffect(() => {
    sendRequest({url: `/api/mpoffice/meme/memeList?userId=${JSON.parse(sessionStorage.user).userId}`})
  }, [])

  const submitHandler = () => {
    if(selectedImgSrc){
      navigate('/setting/user-edit/profile', {state:{imgSrc: selectedImgSrc}})
    } else{
      alert('프로필 이미지를 선택하세요.')
    }
  }

  return (
    <div className="wrapper">
      <div className={styles.header}>
        <p onClick={()=>navigate('/setting/user-edit/profile')}>취소</p>
        <p className="pageName">프로필 사진</p>
        <p className={styles.submit} onClick={submitHandler}>확인</p>
      </div>
      <Divider className="divider" />
      <div className={styles.body}>
        <div className={styles.basicImg}>
          <div className={styles.settingMenu}>기본</div>
          <Avatar
            onClick={() => {
              selectedImg === 0 ? setSelectedImg(-1) : setSelectedImg(0);
              selectedImg === 0 ? setSelectedImgSrc(null) : setSelectedImgSrc(LOGO_IMG_URL);
            }}
            className={selectedImg === 0 ? styles.selected : styles.avatar}
            image={LOGO_IMG_URL}
            shape="circle"
          />
        </div>

        <div className={styles.myNFT}>
          <div className={styles.settingMenu}>내 NFT</div>
          <div className={styles.myNftList}>

          {!isLoading && data && data.map((item: {id: number; imgUrl: string}) => {
            return (
              <Avatar
              key={item.id}
              image={item.imgUrl}
              onClick={() => {
                selectedImg === item.id
                ? setSelectedImg(-1)
                : setSelectedImg(item.id);
                selectedImg === item.id ? setSelectedImgSrc(null) : setSelectedImgSrc(item.imgUrl);
              }}
              className={
                selectedImg === item.id ? styles.selected : styles.avatar
              }
                shape="circle"
              />
              );
            })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditPage;
