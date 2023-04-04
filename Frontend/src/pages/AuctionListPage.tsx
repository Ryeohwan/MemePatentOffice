// auction list page (/auction-list)
import { useState } from 'react';
import AuctionAddBtn from 'components/auction/list/AuctionAddBtn';
import AuctionListTabComp from 'components/auction/list/AuctionListTabComp';
import UploadModal from 'components/auction/upload/UploadModal';
import styles from './AuctionListPage.module.css';


const AuctionListPage: React.FC = () => {
  const [visible,setVisible] = useState<boolean>(false)
  const modalHandler = (visible:boolean) => {
    setVisible(visible)
  }
  return (
    <div className={styles.pageContainer}>
    <p className={styles.pageHeader}>경매 둘러보기</p>
    <AuctionListTabComp />
    <AuctionAddBtn visible={visible} modalHandler={modalHandler}/>
    <UploadModal visible={visible} modalHandler={modalHandler}/>
  </div>
  )
 }
 
 export default AuctionListPage; 