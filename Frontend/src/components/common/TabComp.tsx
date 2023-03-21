import styles from './TabComp.module.css'
import TabNavComp from './TabNavComp';

interface TabItem {
  name: string;
  path: string;
}

interface Props {
  items: TabItem[];
}

const TabComp:React.FC<Props> = ({ items }) => {
  return (
    <>
      <div className={styles.tabNavContainer}>
        <TabNavComp items={items}/>
      </div>
      <div className={styles.tabRouteContainer}>
      
      </div>
    </>
  );
};

export default TabComp;