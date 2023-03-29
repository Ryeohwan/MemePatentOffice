import React from "react";
import styles from "./AnimalCard.module.css";

interface AnimalCardProps {
    animalType: string;
};

const AnimalCard:React.FC<AnimalCardProps> = ({animalType}) => {
    return (
        <div>
            nft card
            <img src={`images/${animalType}.jpg`} alt="" className={styles.nftCardImg}/>
        </div>
    )
};

export default AnimalCard;