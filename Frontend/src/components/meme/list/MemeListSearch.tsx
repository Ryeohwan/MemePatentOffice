import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { RootState } from 'store/configStore'
import { memeListActions } from 'store/memeList'

import SearchComp from 'components/common/SearchComp';
import styles from './MemeListSearch.module.css';

const MemeListSearch = () => {
  const dispatch = useDispatch()
  
  const [searchInput, setSearchInput] = useState("")
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // enter 누르면 redux input 바꾸기
  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchInput) return;
    if (e.key !== "Enter") return;
    dispatch(memeListActions.changeInputTxt(searchInput));
  }
  
  return (
    <div className={styles.searchContainer}>
      <SearchComp>
        <input className={styles.input} onChange={changeHandler} onKeyUp={enterHandler}/>
      </SearchComp>
    </div>
  );
};

export default MemeListSearch;