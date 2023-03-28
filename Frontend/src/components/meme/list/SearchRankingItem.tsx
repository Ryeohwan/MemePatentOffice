import {useDispatch} from 'react-redux'
import { memeListActions } from 'store/memeList'

import styles from './SearchRankingItem.module.css';

interface Props {
  item: {
    rank: number;
    text: string;
  }
}

const SearchRankingItem: React.FC<Props> = ({item}) => {
  const dispatch = useDispatch()

  const clickhandler = (text: string) => {
    dispatch(memeListActions.changeInputTxt(text))
  }

  return (
    <div className={styles.itemContainer}>
      <span className={`${styles.rankItem} ${item.rank < 4 && styles.rankPoint}`}>
        {item.rank}
      </span>
      
      <span className={styles.textItem}>
        <span onClick={() => clickhandler(item.text)}>
          {item.text}
        </span>
      </span>
    </div>
  );
};

export default SearchRankingItem;
