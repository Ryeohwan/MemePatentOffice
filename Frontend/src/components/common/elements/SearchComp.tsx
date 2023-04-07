import { Icon } from "@iconify/react";
import styles from "./SearchComp.module.css";

interface Props {
  children: React.ReactNode;
}

const SearchComp: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.searchComp}>
      <div className={styles.iconContainer}>
        <Icon icon="mdi:search" className={styles.icon} />
      </div>

      <div className={styles.inputContainer}>
        {children}
      </div>
    </div>
  );
};

export default SearchComp;
