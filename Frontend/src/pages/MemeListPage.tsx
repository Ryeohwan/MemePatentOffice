// meme list page (/meme-list)
import MemeListSearch from 'components/meme/list/MemeListSearch';
import MemeListTabComp from 'components/meme/list/MemeListTabComp';
import styles from './MemeListPage.module.css'

const MemeListPage: React.FC = () => {
  return (
   <div className={styles.pageContainer}>
     <p className={styles.pageHeader}>밈 모음집</p>
      <MemeListSearch />
      <MemeListTabComp />
   </div>
  )
 }
 
 export default MemeListPage; 