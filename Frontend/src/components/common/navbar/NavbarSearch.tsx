import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "hooks/useAppDispatch";
import { memeListActions, getMemeNewListAxiosThunk, getMemePopularListAxiosThunk } from "store/memeList";
import { RootState } from "store/configStore";

import SearchComp from "../elements/SearchComp";
import { Icon } from "@iconify/react";
import styles from "./NavbarSearch.module.css";


const NavbarSearch: React.FC = () => {
  const appDispatch = useAppDispatch();
  const range = useSelector<RootState, string>((state) => state.memeList.range);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // click하면 search comp 열림
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // enter 누르면 redux input 바꾸기 -> get해오기 -> memeList page 이동
  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !inputRef.current) return;
    if (inputRef.current.value.trim().length === 0) return;
    dispatch(memeListActions.changeInputTxt(inputRef.current.value.trim()));
    
    console.log('input 바꼈음!')
    appDispatch(getMemeNewListAxiosThunk(inputRef.current.value.trim(), -1));
    appDispatch(getMemePopularListAxiosThunk(inputRef.current.value.trim(), range, false, -1))
    
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
