import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "./ProfileNicknameArea.module.css";

interface Props {
  nickname: string;
}

const ProfileNicknameArea: React.FC<Props> = ({ nickname }) => {
  const navigate = useNavigate();
  // myprofile 이면 true 다른 user profile이면 false
  const isMyProfile = (JSON.parse(sessionStorage.getItem('user')!).nickname === nickname)

  return (
    <div className={styles.areaContainer}>
      <span className={styles.nickname}>{nickname}</span>

      {isMyProfile && (
        <span onClick={() => navigate("/setting")}>
          <Icon icon="uiw:setting" className={styles.setting} />
        </span>
      )}
    </div>
  );
};

export default ProfileNicknameArea;
