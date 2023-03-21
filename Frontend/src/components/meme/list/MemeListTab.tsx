import TabComp from "components/common/TabComp";
import styles from "./MemeListTab.module.css";

const MemeListTab: React.FC = () => {
  const tabItems = [
    { name: "최신순", path: "/meme-list?type=new" },
    { name: "인기순", path: "/meme-list?type=popular" },
  ];

  return (
    <>
      <div className={styles.tabContainer}>
        <TabComp items={tabItems} />
      </div>
    </>
  );
};

export default MemeListTab;
