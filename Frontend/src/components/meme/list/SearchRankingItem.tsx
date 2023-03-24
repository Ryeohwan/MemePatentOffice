import styles from './SearchRankingItem.module.css';

interface Props {
  item: {
    rank: number;
    text: string;
  }
}

const SearchRankingItem: React.FC<Props> = ({item}) => {
  return (
    <div className={styles.itemContainer}>
      <span className={`${styles.rankItem} ${item.rank < 4 && styles.rankPoint}`}>
        {item.rank}
      </span>
      
      <span className={styles.textItem}>
        {item.text}
      </span>
    </div>
  );
};

export default SearchRankingItem;
