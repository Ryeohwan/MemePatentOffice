// landing page ()
import React from "react";

import LandingScene from "components/main/landingpage/LandingScene";

import styles from "./LandingPage.module.css";

const LandingPage: React.FC = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return (
    <>
      <LandingScene width={width} height={height} />
      <div className={styles.sections}>
        <section className={styles.section}>
          <h2></h2>
        </section>
        <section className={styles.section}>
          <h2></h2>
        </section>
        <section className={styles.section}>
          <h2></h2>
        </section>
        <section className={styles.section}>
          <h2></h2>
        </section>
        <section className={styles.section}>
          <h2></h2>
        </section>
        <section className={styles.section}>
          <h2></h2>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
