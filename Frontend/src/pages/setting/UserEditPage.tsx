// 회원정보 수정 page (/setting/user-edit)
import React from "react";
import { useNavigate } from "react-router-dom";

import { Divider } from "primereact/divider";
import "pages/setting/Setting.css"

const UserEditPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="wrapper">
      <p className="pageName">회원 정보 수정</p>
      <Divider className="divider" />
      <div>
        <div onClick={()=>navigate('profile')} className="router-wrapper">
          <i className="pi pi-pencil" />
          <p>프로필 수정</p>
        </div>
        
        {/* <div onClick={()=>navigate('user-edit')} className="router-wrapper">
          <i className="pi pi-wallet" />
          <p>내 지갑</p>
        </div> */}

        <div onClick={()=>navigate('withdrawl')} className="router-wrapper">
          <i className="pi pi-user-minus" />
          <p>회원 탈퇴</p>
        </div>


      </div>
    </div>
    )
 }
 
 export default UserEditPage; 