import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TabNavComp.module.css";


interface TabItem {
  name: string;
  path: string;
}

interface Props {
  items: TabItem[];
  clickHandler: (item: TabItem) => void;
}

const TabNavComp: React.FC<Props> = ({ items, clickHandler }) => {
  const location = useLocation();
  const itemLen = items.length;
  let itemIdx = -1;
  for (let i = 0; i < itemLen; i++) {
    if (items[i].path.startsWith(decodeURIComponent(location.pathname))) {
      itemIdx = i + 1;
    }
  }

  return (
    <>
      <div className={styles.tabMenuContainer}>
        {items.map((item) => {
          return (
            <div
              key={item.name}
              className={styles.tabMenu}
              onClick={() => clickHandler(item)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className={styles.tabBarContainer}>
        <div
          className={`${styles.tabBar}
          ${itemLen === 2 && itemIdx === 1 && styles.idxOneOfTwo}
          ${itemLen === 2 && itemIdx === 2 && styles.idxTwoOfTwo}
          ${itemLen === 3 && itemIdx === 1 && styles.idxOneOfThree}
          ${itemLen === 3 && itemIdx === 2 && styles.idxTwoOfThree}
          ${itemLen === 3 && itemIdx === 3 && styles.idxThreeOfThree}`}
        />
      </div>
    </>
  );
};

export default TabNavComp;