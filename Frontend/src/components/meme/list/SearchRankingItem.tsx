import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "store/configStore";
import { useAppDispatch } from "hooks/useAppDispatch";
import { memeListActions, getMemeNewListAxiosThunk, getMemePopularListAxiosThunk } from "store/memeList";

import styles from './SearchRankingItem.module.css';

interface Props {
  item: {
    rank: number;
    text: string;
  }
}

const SearchRankingItem: React.FC<Props> = ({item}) => {
  const dispatch = useDispatch()
  const appDispatch = useAppDispatch();
  const range = useSelector<RootState, string>((state) => state.memeList.range);

  const clickhandler = (text: string) => {
    dispatch(memeListActions.changeInputTxt(text))
    console.log('input 바꼈음!')
    appDispatch(getMemeNewListAxiosThunk(text, -1));
    appDispatch(getMemePopularListAxiosThunk(text, range, false, -1))
  }

  return (
    <div className={styles.itemContainer}>
      <span className={`${styles.rankItem} ${item.rank < 4 && styles.rankPoint}`}>
        {item.rank}
      </span>
      
      <span className={styles.textItem}>
        <span onClick={() => clickhandler(item.text)}>
          {item.text.length > 15 ? item.text.substring(0, 15) + '...' : item.text}
        </span>
      </span>
    </div>
  );
};

export default SearchRankingItem;
