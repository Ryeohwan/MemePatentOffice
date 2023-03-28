// setting page (/setting)
import React from "react";
import { useNavigate } from "react-router-dom";

import { Divider } from "primereact/divider";

import "pages/setting/Setting.css";

const SettingPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="wrapper">
      <p className="pageName">설정</p>
      <Divider className="divider" />
      <div>
        <div onClick={()=>navigate('user-edit')} className="router-wrapper">
          <i className="pi pi-user" />
          <p>회원 정보 수정</p>
        </div>

        <div onClick={()=>navigate('history')} className="router-wrapper">
          <i className="pi pi-history" />
          <p>내 활동</p>
        </div>

        <div onClick={()=>navigate('auction-history')} className="router-wrapper">
          <i className="pi pi-shopping-bag" />
          <p>거래 내역</p>
        </div>

        <div onClick={()=>navigate('notification')} className="router-wrapper">
          <i className="pi pi-bell" />
          <p>알림 설정</p>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
