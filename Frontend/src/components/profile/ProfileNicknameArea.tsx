import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "./ProfileNicknameArea.module.css";

interface Props {
  nickname: string;
  isMyProfile: boolean;
}

const ProfileNicknameArea: React.FC<Props> = ({ nickname, isMyProfile }) => {
  const navigate = useNavigate();
  
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
