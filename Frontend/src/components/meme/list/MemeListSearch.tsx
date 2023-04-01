import {  useState, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux'

import { RootState } from 'store/configStore'
import { memeListActions } from 'store/memeList'

import SearchComp from 'components/common/elements/SearchComp';
import styles from './MemeListSearch.module.css';

const MemeListSearch = () => {
  const dispatch = useDispatch()
  const input = useSelector<RootState, string>(state => state.memeList.input)
  const inputRef = useRef<HTMLInputElement>(null);

  // enter 누르고 input 값 있으면 redux list reset + input 바꾸기
  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !inputRef.current) return;
    if (inputRef.current.value.trim().length === 0) return;
    if (inputRef.current.value === input) return;
    dispatch(memeListActions.changeResult(true));    // 검색결과 reset
    dispatch(memeListActions.resetMemeNewList());
    dispatch(memeListActions.resetMemePopularList());
    dispatch(memeListActions.changeInputTxt(inputRef.current.value.trim()));
  }
  

  return (
    <div className={styles.searchContainer}>
      <SearchComp>
        <input className={styles.input} ref={inputRef} onKeyUp={enterHandler} defaultValue={input} placeholder="검색어를 입력해주세요"/>
      </SearchComp>
    </div>
  );
};

export default MemeListSearch;