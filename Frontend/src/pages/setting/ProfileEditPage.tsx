// 프로필 수정 page (/setting/user-edit/profile)
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import NicknameInput from "components/settings/edit/NicknameInput";
import AddBtn from "components/common/elements/AddBtn";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";

import "pages/setting/Setting.css";
import styles from "pages/setting/ProfileEditPage.module.css";

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const porfileImg = location.state
    ? location.state.imgSrc
    : JSON.parse(sessionStorage.user).imgUrl;

  const [nickname, setNickname] = useState("");
  const [nicknameState, setNicknameState] = useState(true); // 유효성 검사 + 중복 검사
  const [nicknameLoading, setNicknameLoading] = useState(false);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  // 회원정보 수정
  const submitHandler = () => {
    if (nicknameLoading || !nicknameState) return;
    console.log('submit!')
    console.log(porfileImg);
    console.log(nickname);
  };

  return (
    <div className="wrapper">
      <div className={styles.header}>
        <p
          onClick={() => {
            navigate("/setting/user-edit");
          }}
        >
          취소
        </p>
        <p className="pageName">프로필 수정</p>
        <p className={styles.confirm} onClick={submitHandler}>
          확인
        </p>
      </div>
      <Divider className="divider" />

      <div className={styles.bodyWrapper}>
        <div className={styles.profileImg}>
          <Avatar
            className={styles.avatar}
            image={porfileImg}
            shape="circle"
          ></Avatar>
          <div
            onClick={() => {
              navigate("/setting/user-edit/image");
            }}
            className={styles.btnContainer}
          >
            <AddBtn />
          </div>
        </div>

        <div className={styles.nicknameWrapper}>
          <p>닉네임</p>
          <NicknameInput
            nickname={nickname}
            nicknameLoading={nicknameLoading}
            setNicknameLoading={setNicknameLoading}
            nicknameState={nicknameState}
            setNicknameState={setNicknameState}
            changeHandler={changeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
