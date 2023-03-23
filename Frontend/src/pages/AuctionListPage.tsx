// auction list page (/auction-list)

import AuctionListTabComp from 'components/auction/list/AuctionListTabComp';
import styles from './AuctionListPage.module.css';


const AuctionListPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
    <p className={styles.pageHeader}>경매 둘러보기</p>
    <AuctionListTabComp />
  </div>
  )
 }
 
 export default AuctionListPage; 