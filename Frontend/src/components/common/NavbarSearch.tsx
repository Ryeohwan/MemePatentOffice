import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import SearchComp from "./SearchComp";
import { memeListActions } from "store/memeList";

import { Icon } from "@iconify/react";
import styles from "./NavbarSearch.module.css";

const NavbarSearch: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // click하면 search comp 열림
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // enter 누르면 redux input 바꾸기 -> memeList page 이동
  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !inputRef.current) return;
    if (inputRef.current.value.trim().length === 0) return;
    dispatch(memeListActions.changeInputTxt(inputRef.current.value.trim()));
    navigate("/meme-list/type=new")
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
              <input
                className={styles.input}
                placeholder="밈을 검색하세요"
                ref = {inputRef}
                onKeyUp={enterHandler}
              />
            </SearchComp>
          </div>
          <div
            className={styles.closeItem}
            onClick={() => setOpen(false)}
            onKeyUp={enterHandler}
          >
            X
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarSearch;
