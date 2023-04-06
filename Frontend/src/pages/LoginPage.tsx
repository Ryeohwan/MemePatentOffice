// login page (/oauth2/redirect?)
// kakao login시 redirect 되는 페이지
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useAxios from 'hooks/useAxios';


const LoginPage: React.FC = () => { 
  const navigate = useNavigate();
  const location = useLocation();

  // user info 받아오기
  const {data, status, sendRequest} = useAxios();
  
  class User {
    userId: number;
    nickname: string;
    imgUrl: string;
    walletAddress: string|null;
  
    constructor(userId: number, nickname: string, imgUrl: string, walletAddress:string|null) {
      this.userId = userId;
      this.nickname = nickname;
      this.imgUrl = imgUrl;
      this.walletAddress = walletAddress;
    }
  }

  //params 에 담긴 항목 가져오기 
  useEffect(() => {
    
    const searchParams = location.search;
    //obj에 URLSearchParams를 사용해 담아준다.
    const obj = new URLSearchParams(searchParams);
    // token & id 받아오기
    const accessToken = obj.get("token");
    const userId = parseInt(obj.get("id")!, 10);
    // accessToken 저장
    sessionStorage.setItem("accessToken", accessToken!)

    // user nickname & img 받아오기
    sendRequest({url: `/api/mpoffice/user/info/${userId}`})
    
  }, [])
  
  // userInfo 받아와서 session 저장 -> main이동
  useEffect(() => {
    if (status !== 200) return;

    const user = new User(data.id, data.nickname, data.profileImage, data.walletAddress)
    sessionStorage.setItem("user", JSON.stringify(user));
    navigate("/main")
  }, [status])


  return (
   <>
   </>
  )
 }
 
 export default LoginPage; 