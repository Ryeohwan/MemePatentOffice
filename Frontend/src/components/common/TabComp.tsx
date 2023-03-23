import React, { useEffect, useState, useRef } from "react";
import { Routes, useLocation, useNavigate } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import TabNavComp from "./TabNavComp";

import "./TabComp.css";
import styles from "./TabComp.module.css";

interface Props {
  children: React.ReactNode;
}

interface TabItem {
  name: string;
  path: string;
}

interface Props {
  items: TabItem[];
  children: React.ReactNode;
}

const TabComp: React.FC<Props> = ({ items, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [historyArr, setHistoryArr] = useState<string[]>([]);
  // const [slideDirection, setSlideDirection] = useState("");
  const slideDirection= useRef<string>('');

  const pathArr: string[] = [];
  for (let i = 0; i < items.length; i++) {
    pathArr.push(items[i].path);
  }

  const clickHandler = (item: TabItem) => {
    slideDirection.current = (
      pathArr.indexOf(location.pathname) >
        pathArr.indexOf(historyArr[historyArr.length - 1])
        ? "right"
        : "left"
    );
    const next = (
      pathArr.indexOf(location.pathname) <
        pathArr.indexOf(item.path)
        ? "right"
        : "left"
    );
    if(slideDirection.current===next) {
      slideDirection.current= slideDirection.current==="right" ? "left":"right";
    } else{
      slideDirection.current = next
    }
    console.log(slideDirection.current);
 

    navigate(item.path, { replace: true })
  }

  useEffect(() => {
    // setSlideDirection(
    //   pathArr.indexOf(location.pathname) >
    //     pathArr.indexOf(historyArr[historyArr.length - 1])
    //     ? "right"
    //     : "left"
    // );
  
    setHistoryArr((prev) => [...prev, location.pathname]);
  }, [location]);
  console.log(slideDirection.current)
  useEffect(()=> {
    slideDirection.current = (
      pathArr.indexOf(location.pathname) <
        pathArr.indexOf(historyArr[historyArr.length - 1])
        ? "right"
        : "left"
    );
  }, [])

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabNavContainer}>
        <TabNavComp items={items} clickHandler={clickHandler}/>
      </div>
      <div className={styles.tabRouteContainer}>
        <TransitionGroup
          className={styles.transitionsWrapper}
          // childFactory={(child) => {
          //   return React.cloneElement(child, {
          //     classNames: slideDirection,
          //   });
          // }}
        >
          <CSSTransition
            key={location.pathname}
            classNames={slideDirection.current}
            timeout={1000}
          >
            <Routes location={location}>{children}</Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
};

export default TabComp;
