import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { memeListActions } from "store/memeList";
import { useNavigate } from "react-router-dom";
import styles from "components/main/homepage/HomeCarousel.module.css";

interface HomeCarouselProps {
  info: {
    id: number;
    imgUrl: string;
    btnTxt: string;
    btnUrl: string|null;
    btnEffect: ()=>Promise<void>
  }[];
}

const HomeCarousel: React.FC<HomeCarouselProps> = ({ info }) => {
  const dispatch = useDispatch();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
        setCurrentImageIndex(currentImageIndex=>
            currentImageIndex === info.length - 1 ? 0 : currentImageIndex + 1
          );
    }, 7000);
    return () => {
        clearInterval(intervalId);
    }
  }, []);

  const navigateHandler = (url: string) => {
    // 밈 사전으로 들어갈떄 redux reset
    if (url === "/meme-list/type=new") {
      dispatch(memeListActions.resetAll());
    }
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
        src={info[currentImageIndex].imgUrl}
        alt="carousel"
      />
      <i className="pi pi-chevron-right" id="right" onClick={handleNextClick} />
      <button
        className={styles.carouselBtn}
        onClick={() => {
          if(info[currentImageIndex].btnUrl){
            navigateHandler(info[currentImageIndex].btnUrl!);
          } else if (info[currentImageIndex].btnEffect !== null){
            info[currentImageIndex].btnEffect()
          }
        }}
      >
        {info[currentImageIndex].btnTxt}
      </button>
    </div>
  );
};

export default HomeCarousel;
