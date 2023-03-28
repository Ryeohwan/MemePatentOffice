// 프로필 수정 page (/setting/user-edit/profile)
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AddBtn from "components/common/AddBtn";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";
import { InputText } from 'primereact/inputtext';

import "pages/setting/Setting.css";
import styles from "pages/setting/ProfileEditPage.module.css";
const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const porfileImg = location.state ? location.state.imgSrc : JSON.parse(sessionStorage.user).imgUrl
  
  return (
    <div className="wrapper">
      <div className={styles.header}>
        <p onClick={()=>{navigate('/setting/user-edit')}}>취소</p>
        <p className="pageName">프로필 수정</p>
        <p className={styles.confirm}>확인</p>
      </div>
      <Divider className="divider" />

      <div className={styles.bodyWrapper}>
        <div className={styles.profileImg}>
          <Avatar className={styles.avatar} image={porfileImg} shape="circle"></Avatar>
          <div onClick={()=>{navigate('/setting/user-edit/image')}} className={styles.btnContainer}>
            <AddBtn />
          </div>
        </div>

        <div className={styles.nickname}>
          <label htmlFor="nickname">닉네임</label>
          <InputText id="nickname" placeholder={JSON.parse(sessionStorage.user).nickname}/>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
