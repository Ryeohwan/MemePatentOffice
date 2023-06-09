import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  width: number;
  height: number;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ width, height }) => {
  const { pathname } = useLocation();
  const ifChange = pathname.split("/");

  useEffect(() => {
    window.scrollTo(width, height);
  }, [ifChange[1]]);

  return null;
};

export default ScrollToTop;

