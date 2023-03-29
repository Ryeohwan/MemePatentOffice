// auction list page (/auction-list)

import AuctionAddBtn from 'components/auction/list/AuctionAddBtn';
import AuctionListTabComp from 'components/auction/list/AuctionListTabComp';
import UploadModal from 'components/auction/upload/UploadModal';
import styles from './AuctionListPage.module.css';


const AuctionListPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
    <p className={styles.pageHeader}>경매 둘러보기</p>
    <AuctionListTabComp />
    <AuctionAddBtn/>
    <UploadModal/>
  </div>
  )
 }
 
 export default AuctionListPage; 