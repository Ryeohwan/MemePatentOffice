import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./HomeCarousel.module.css";

interface MainProps {
    items: {id: number, imgUrl: string, btnTxt: string, btnUrl: string};
};

const HomeCarousel:React.FC<MainProps> = main => {
    const IMG_URL = "http://localhost:3000/" + main.items.imgUrl;
    const BTN_TXT = main.items.btnTxt;
    const BTN_URL = main.items.btnUrl;

    return (
        <div className={styles.mainCarousel}>
            <img src={IMG_URL} alt="" className={styles.carouselImg}/>
            <NavLink to={BTN_URL}>
                <button className={styles.carouselBtn}>{BTN_TXT}</button>
            </NavLink>
        </div>
    );
};

export default HomeCarousel;