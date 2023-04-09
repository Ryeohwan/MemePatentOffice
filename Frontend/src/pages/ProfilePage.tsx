// profile page (/profile/:nickname)
import { useEffect } from 'react';
import { useParams } from "react-router-dom";

import ProfileImageArea from "components/profile/ProfileImageArea";
import ProfileNicknameArea from "components/profile/ProfileNicknameArea";
import ProfileTabComp from "components/profile/ProfileTabComp";

import styles from "./ProfilePage.module.css";

const ProfilePage: React.FC = () => {
  const params = useParams();
  const nickname = params.nickname;
  const auction_id = params.auctionId ? params.auctionId : null
  
  // myprofile 이면 true 다른 user profile이면 false
  const isMyProfile = (JSON.parse(sessionStorage.getItem('user')!).nickname === nickname)
  
  return (
    <>
      {nickname && (
        <div className={styles.pageContainer}>
          <ProfileImageArea nickname={nickname} isMyProfile={isMyProfile} />
          <ProfileNicknameArea nickname={nickname} isMyProfile={isMyProfile}/>
          <ProfileTabComp nickname={nickname} auction_id={auction_id}/>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
