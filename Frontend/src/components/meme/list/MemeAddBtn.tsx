import React, { useRef } from "react";
import { NavLink } from 'react-router-dom';
import AddBtn from "components/common/AddBtn";

import { OverlayPanel } from "primereact/overlaypanel";
import styles from "./MemeAddBtn.module.css";

// meme-list page에서 meme-upload로 이동하는 버튼
const MemeAddBtn: React.FC = () => {
  const op = useRef<any>(null);

  return (
    <div className={styles.addBtnContainer}>
      <div
        className={styles.btnContainer}
        onClick={(e) => op.current.toggle(e)}
      >
        <AddBtn />
      </div>
      
      <OverlayPanel ref={op}>
        <NavLink to="/meme-upload" className={styles.navLink}>
            밈 등록하기
        </NavLink>
      </OverlayPanel>
    
    </div>
  );
};

export default MemeAddBtn;
