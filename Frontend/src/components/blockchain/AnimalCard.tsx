import React from "react";

interface AnimalCardProps {
    animalType: string;
};

const AnimalCard:React.FC<AnimalCardProps> = ({animalType}) => {
    return (
        <div>
            Animal Card
            <img src={`images/${animalType}.jpg`} alt="" />
        </div>
    )
};

export default AnimalCard;