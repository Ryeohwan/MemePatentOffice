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
  console.log(items,children,location)
  const [historyArr, setHistoryArr] = useState<string[]>([]);
  const [slideDirection, setSlideDirection] = useState("");

  const pathArr: string[] = [];
  for (let i = 0; i < items.length; i++) {
    pathArr.push(items[i].path);
  }

  const clickHandler = (item: TabItem) => {
    let direction = "left";
    if (item.path.includes("?")) {
      direction =
        pathArr.indexOf(decodeURIComponent(location.pathname)) > pathArr.indexOf(item.path.substring(0, item.path.indexOf('?')))
          ? "left"
          : "right";
    } else {
      direction = direction =
        pathArr.indexOf(decodeURIComponent(location.pathname)) > pathArr.indexOf(item.path)
          ? "left"
          : "right";
    };
    // console.log(pathArr)
    // console.log(decodeURIComponent(location.pathname),  pathArr.indexOf(location.pathname))
    // console.log(item.path, pathArr.indexOf(item.path), item.path.substring(0, item.path.indexOf('?')))
    setSlideDirection(direction);
    // console.log(direction);
    setHistoryArr((prev) => [...prev, item.path]);
  };

  useEffect(() => {
    navigate(historyArr[historyArr.length - 1], { replace: true });
  }, [historyArr]);

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabNavContainer}>
        <TabNavComp items={items} clickHandler={clickHandler} />
      </div>
      <div className={styles.tabRouteContainer}>
        <TransitionGroup className={styles.transitionsWrapper}>
          <CSSTransition
            key={location.pathname}
            classNames={slideDirection}
            timeout={500}
          >
            <Routes location={location}>{children}</Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
};

export default TabComp;
