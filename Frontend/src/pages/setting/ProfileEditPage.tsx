// 프로필 수정 page (/setting/user-edit/profile)
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import NicknameInput from "components/settings/edit/NicknameInput";
import useAxios from "hooks/useAxios";
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

  // user update api
  const {status, isLoading, sendRequest} = useAxios();

  // 회원정보 수정
  const submitHandler = () => {
    if (nicknameLoading || !nicknameState) return;
        
    sendRequest({
      url: `/api/mpoffice/user/update`,
      method: "POST",
      data: {
        id: JSON.parse(sessionStorage.user).userId,
        nickname: nickname ? nickname : JSON.parse(sessionStorage.user).nickname,
        userImage: porfileImg
      }
    })
  };

  // 수정 완료되면 session에 값 바꾸기
  useEffect(() => {
    if (!isLoading && status === 200) {
      const user = JSON.parse(sessionStorage.user)
      user.imgUrl = porfileImg
      user.nickname = (nickname && nickname.length > 0) ? nickname : user.nickname
      alert("회원정보가 수정되었습니다.")
      sessionStorage.setItem("user", JSON.stringify(user))
      navigate(`/profile/${JSON.parse(sessionStorage.user).nickname}/tab=nft`)
    }
  }, [status, isLoading])

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
