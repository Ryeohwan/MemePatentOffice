// 프로필사진 수정 page (/setting/user-edit/image)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "assets/logo.png";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";

import "pages/setting/Setting.css";
import styles from "pages/setting/ImageEditPage.module.css";



// 더미 데이터 -> Axios 받아와서 수정
import auction from "assets/auction.png";
import haku from "assets/haku.png";
import kakao from "assets/kakao.png";
const myNFT = [
  {
    id: 1,
    imgSrc: haku,
  },
  {
    id: 2,
    imgSrc: kakao,
  },
  {
    id: 3,
    imgSrc: auction,
  },
];

const ImageEditPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedImg, setSelectedImg] = useState<number>(-1);
  const [selectedImgSrc, setSelectedImgSrc] = useState<string | null>(null);

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
          <p>기본</p>
          <Avatar
            onClick={() => {
              selectedImg === 0 ? setSelectedImg(-1) : setSelectedImg(0);
              selectedImg === 0 ? setSelectedImgSrc(null) : setSelectedImgSrc(logo);
            }}
            className={selectedImg === 0 ? styles.selected : styles.avatar}
            image={logo}
            shape="circle"
          />
        </div>

        <div className={styles.myNFT}>
          <p>내 NFT</p>
          <div className={styles.myNftList}>

          {myNFT.map((item, index) => {
            return (
              <Avatar
              key={index}
              image={item.imgSrc}
              onClick={() => {
                selectedImg === item.id
                ? setSelectedImg(-1)
                : setSelectedImg(item.id);
                selectedImg === item.id ? setSelectedImgSrc(null) : setSelectedImgSrc(item.imgSrc);
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
