import styles from "./ProfileImageArea.module.css";

interface Props {
  imgUrl: string;
}

const ProfileImageArea: React.FC<Props> = ({ imgUrl }) => {

  return (
    <div className={styles.areaContainer}>
        <div className={styles.backgroundContainer} />
        <div className={styles.imgContainer}>
          <img src={imgUrl} alt="" className={styles.img}/>
        </div>
    </div>
  );
};

export default ProfileImageArea;
