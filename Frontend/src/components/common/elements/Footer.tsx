import logo from "assets/logo.png";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      {/* <p className={styles.logoTxt}>MEME</p> */}
      <p className={styles.info}>본 사이트의 컨텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사, 배포를 금합니다.</p>
      <p className={styles.copyright}>Copyright © DAHAEJO All Rights Reserved.</p>
    </div>
  )
};

export default Footer;