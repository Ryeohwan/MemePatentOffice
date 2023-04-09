import { useEffect, useRef } from 'react';
import useAxios from "hooks/useAxios";
import styles from "./ProfileImageArea.module.css";

interface Props {
  nickname: string;
  isMyProfile: boolean;
}

const ProfileImageArea: React.FC<Props> = ({ nickname, isMyProfile }) => {
  const {data, isLoading, sendRequest} = useAxios();

  useEffect(() => {
    if (!isMyProfile) sendRequest({ url: `/api/mpoffice/user/profile/image/${nickname}`})
  }, [])

  return (
    <div className={styles.areaContainer}>
        <div className={styles.backgroundContainer} />
        <div className={styles.imgContainer}>
          {isMyProfile && <img src={JSON.parse(sessionStorage.getItem('user')!).imgUrl} alt=""/>}
          {!isMyProfile && !isLoading && data && <img src={data.imgUrl} alt=""/>}
        </div>
    </div>
  );
};

export default ProfileImageArea;
