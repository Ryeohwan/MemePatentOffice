// prime react version

import { TabView, TabPanel } from "primereact/tabview";
import styles from "./TabComp.module.css";

interface Props {
  items: string[]
}

const TabComp: React.FC<Props> = ({items}) => {
 
  return (
    <div className="card">
      <TabView>
        {items.map((item) => {
          return (
            <TabPanel key={item} header={item}>
              {/* <p className="m-0">{item}</p> */}
            </TabPanel>
          );
        })}
      </TabView>
    </div>
  );
};

export default TabComp;
