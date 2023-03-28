import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps{
    width: number,
    height: number,
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({width, height}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(width, height);
  }, [pathname]);

  return null;
}

export default ScrollToTop