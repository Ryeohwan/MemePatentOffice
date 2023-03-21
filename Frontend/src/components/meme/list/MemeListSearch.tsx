import { useEffect, useState } from 'react';
import SearchComp from 'components/common/SearchComp';
import styles from './MemeListSearch.module.css';

const MemeListSearch = () => {
  const [searchInput, setSearchInput] = useState("")
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // searchInput 바뀔때마다 1초 후 검색 api
  useEffect(() => {

  }, [searchInput])
  
  
  return (
    <div className={styles.searchContainer}>
      <SearchComp>
        <input className={styles.input} onChange={changeHandler}/>
      </SearchComp>
    </div>
  );
};

export default MemeListSearch;