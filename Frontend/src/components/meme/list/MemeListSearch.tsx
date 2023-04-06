import { useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useAppDispatch } from "hooks/useAppDispatch";
import { RootState } from 'store/configStore'
import { memeListActions, getMemeNewListAxiosThunk, getMemePopularListAxiosThunk } from "store/memeList";

import SearchComp from 'components/common/elements/SearchComp';
import styles from './MemeListSearch.module.css';

const MemeListSearch = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const input = useSelector<RootState, string>(state => state.memeList.input);
  const range = useSelector<RootState, string>((state) => state.memeList.range);
  const inputRef = useRef<HTMLInputElement>(null);


  // enter 누르면 redux input 바꾸기 -> get 해오기
  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !inputRef.current) return;
    if (inputRef.current.value.trim().length === 0) return;
    if (inputRef.current.value === input) return;
    dispatch(memeListActions.changeInputTxt(inputRef.current.value.trim()));

    console.log('input 바꼈음!')
    appDispatch(getMemeNewListAxiosThunk(inputRef.current.value.trim(), -1));
    appDispatch(getMemePopularListAxiosThunk(inputRef.current.value.trim(), range, false, -1))
  }
  
  return (
    <div className={styles.searchContainer}>
      <SearchComp>
        <input className={styles.input} ref={inputRef} onKeyUp={enterHandler} defaultValue={input} placeholder="궁금한 밈을 검색해보세요!"/>
      </SearchComp>
    </div>
  );
};

export default MemeListSearch;