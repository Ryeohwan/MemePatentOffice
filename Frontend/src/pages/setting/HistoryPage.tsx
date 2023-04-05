// 내활동 page (/setting/history)
import React from "react";
import { useNavigate } from "react-router-dom";

import { Divider } from "primereact/divider";
import "pages/setting/Setting.css";

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <p className="pageName">내 활동</p>
      <Divider className="divider" />
      <div>
        <div onClick={() => navigate("comment")} className="router-wrapper">
          <i className="pi pi-comments" />
          <p>내가 쓴 댓글</p>
        </div>

        <div onClick={()=>navigate('nft-like')} className="router-wrapper">
        <i className="pi pi-thumbs-up" />
        <p>좋아하는 NFT</p>
      </div>

        <div onClick={() => navigate("nft-notification")} className="router-wrapper">
          <i className="pi pi-bookmark" />
          <p>알림 받을 NFT</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
