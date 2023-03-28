import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "components/main/homepage/HomeCarousel.module.css";

interface HomeCarouselProps {
  info: {
    id: number;
    imgUrl: string;
    btnTxt: string;
    btnUrl: string;
  }[];
}

const HomeCarousel: React.FC<HomeCarouselProps> = ({ info }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
        setCurrentImageIndex(currentImageIndex=>
            currentImageIndex === info.length - 1 ? 0 : currentImageIndex + 1
          );
    }, 5000);
    return () => {
        console.log(2)
        clearInterval(intervalId);
    }
  }, []);

  const navigateHandler = (url: string) => {
    navigate(url);
  };

  const handlePrevClick = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? info.length - 1 : currentImageIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex(
      currentImageIndex === info.length - 1 ? 0 : currentImageIndex + 1
    );
  };

  return (
    <div className={styles.mainCarousel}>
      <i className="pi pi-chevron-left" id="left" onClick={handlePrevClick} />
      <img
        src={`http://localhost:3000/${info[currentImageIndex].imgUrl}`}
        alt="carousel"
      />
      <i className="pi pi-chevron-right" id="right" onClick={handleNextClick} />
      <button
        className={styles.carouselBtn}
        onClick={() => {
          navigateHandler(info[currentImageIndex].btnUrl);
        }}
      >
        {info[currentImageIndex].btnTxt}
      </button>
    </div>
  );
};

export default HomeCarousel;
