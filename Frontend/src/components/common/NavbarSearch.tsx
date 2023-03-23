import { useState } from "react";

import { Icon } from "@iconify/react";
import styles from "./NavbarSearch.module.css";
import SearchComp from "./SearchComp";

const NavbarSearch: React.FC = () => {
  // click하면 search comp 열림
  const [open, setOpen] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState("")
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };



  return (
    <>
      <Icon
        icon="mdi:search"
        className={styles.searchIcon}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div className={styles.searchCompContainer}>
          <div className={styles.searchComp}>
            <SearchComp>
              <input placeholder="밈을 검색하세요" className={styles.input} onChange={changeHandler}/>
            </SearchComp>
          </div>
          <div className={styles.closeItem} onClick={() => setOpen(false)}>
            X
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarSearch;
