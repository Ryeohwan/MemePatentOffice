import React from "react";
import styles from "./NftCard.module.css";
// import pepe from "assets/pepe.png";
import totoro from "assets/totoro.jpg";

const NftCard:React.FC = () => {
    
    return (
        <div className={styles.nftCardWrapper}>
            <img src={totoro} alt="" className={styles.nftImg}/>
            <div className={styles.nftTxt}>
                토토로 아잉교~ 앙? 나 토토로 사랑하잖아 알아? 알아들었으면 끄덕여. 원고 좋다. 여권 있니? 만들어.
            </div>
            <div className={styles.nftOwner}>
                단발머리 부엉이
            </div>                                                                                  
        </div>
    );
};

export default NftCard;