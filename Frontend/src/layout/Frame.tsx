import Footer from "components/common/Footer";
import Navbar from "components/common/Navbar";
import { useLocation } from "react-router-dom";

import styles from "./Frame.module.css";

interface RoutePath {
  pathname: string;
}

interface Props {
  children: React.ReactNode;
}

const Frame: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation() as RoutePath;
  let mainOnly: boolean =
    ["/", "/login", "/signup"].includes(pathname) ||
    pathname.startsWith("/auction/");

  return (
    <>
      {!mainOnly && (
        <header>
          <Navbar />
        </header>
      )}

      <main
        className={`${styles.mainContainer} ${!mainOnly && styles.mainNotOnly}`}
      >
        {children}
        
        {/* {!mainOnly && (
          <footer>
            <Footer />
          </footer>
        )} */}
      
      </main>
    </>
  );
};

export default Frame;
