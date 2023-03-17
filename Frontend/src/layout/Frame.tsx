import Footer from 'components/common/Footer';
import Navbar from 'components/common/Navbar';
import { useLocation } from 'react-router-dom';

import styles from './Frame.module.css'

interface RoutePath {
  pathname: string;
}

interface Props {
  children: React.ReactNode;
}

const Frame: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation() as RoutePath;

  return (
  <>
    <header className={`${['/', '/login', '/signup'].includes(pathname) && styles.nonVisible}`}>
      <Navbar />
    </header>
    
    <main className={`${styles.mainContainer}`}>
      {children}
    </main>
    
    <footer className={`${['/', '/login', '/signup'].includes(pathname) && styles.nonVisible}`}>
      <Footer />
    </footer>
  </>
 );
};

export default Frame;