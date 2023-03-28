import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import kakaoLogo from "assets/kakao.png";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import logo from "assets/logo.png";
import styles from "pages/LandingPage.module.css";

const LandingPage = () => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "none", duration: 2 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });
    tl.fromTo(
      "#logo",
      { opacity: 1, yPercent: 0 },
      { opacity: 0, yPercent: -100 }
    )
      .from("#section1", { opacity: 0, xPercent: -100 })
      .from("#section2", { opacity: 0, xPercent: 100 })
      .from("#section3", { opacity: 0, yPercent: -100 });
  }, []);


  // 임시 로그인 핸들러
  // sessionstorage에 nickname / imgurl 저장
  // main으로 이동
  const tempLogin = () => {
    class User {
      nickname: string;
      imgUrl: string;
    
      constructor(nickname: string, imgUrl: string) {
        this.nickname = nickname;
        this.imgUrl = imgUrl;
      }
  }

    const user = new User('단발머리 부엉이', 'https://mblogthumb-phinf.pstatic.net/MjAyMDA4MjhfMjAw/MDAxNTk4NjIyNzAzMTY2.4OMKwJR76tS20oeIwYTKWt18EeLhUkRzN0GG_cD8Mdgg.DuP-r3tHSyMPjZjlDdOItSVa9jhMj0KSh4vBPfzHg0sg.JPEG.chance_pol/1598622702162.jpg?type=w800')
    sessionStorage.setItem("user", JSON.stringify(user));
    window.location.href = "main";
  };


  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.section}>
        <div id="logo" className={styles.logowrapper}>
          <Image src={logo} />
          <p>MEME</p>
          <button onClick={tempLogin}>
            <Image src={kakaoLogo} />
            카카오 로그인
          </button>
        </div>
        <section id="section1" className={styles.section1}>
          <h2>Title 1</h2>
        </section>
        <section id="section2" className={styles.section2}>
          <h2>Title 2</h2>
        </section>
        <section id="section3" className={styles.section3}>
          <h2>Title 3</h2>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
