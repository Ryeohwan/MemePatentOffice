import styles from './SearchRankingItem.module.css';

interface Props {
  item: {
    rank: number;
    text: string;
    cnt: number;
  }
}

const SearchRankingItem: React.FC<Props> = ({item}) => {
  return (
    <div className={styles.itemContainer}>
      <span>
        {item.rank}
      </span>
      
      <span>
        {item.text}
      </span>
      
      <span>
        {item.cnt}
      </span>
    </div>
  );
};

export default SearchRankingItem;
