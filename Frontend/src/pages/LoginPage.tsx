// login page (/oauth2/redirect?)
// kakao login시 redirect 되는 페이지
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const LoginPage: React.FC = () => { 
  const navigate = useNavigate();
  const location = useLocation();

  // const {data, }
  
  useEffect(() => {
    //params 에 담긴 항목 가져오기 
    const searchParams = location.search;
    //obj에 URLSearchParams를 사용해 담아준다.
    const obj = new URLSearchParams(searchParams);
    // token 받아오기
    const accessToken = obj.get("token");
    console.log(accessToken);

    // 첫 로그인이면 회원가입....? -> 아니면 그냥 냅다 카카오 닉네임 닉네임으로 박아버리기 (이게 나을듯)

    // 임시 로그인
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
    
    navigate('/main')

  }, [])
  
  return (
   <>
   </>
  )
 }
 
 export default LoginPage; 