import { useCallback, useState } from "react";

import axios, { AxiosError } from "axios";
// import Logout from "./Logout";

// 요기 api 명세 보고 고치기
const getRefreshToken = async () => {
  console.log("get refresh token!");

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/user/refresh`, {
        userId: sessionStorage.getItem("userId")
      },
      {
        headers: {
          refreshToken: `${sessionStorage.getItem("refreshToken")}`,
        },
        validateStatus: (status) => {
          return status === 200 || status === 401;
        },
      }
    );
    console.log('get refresh response', response)
    if (response.status === 200) {
      console.log("refresh token success!");
      sessionStorage.setItem("accessToken", response.data.accessToken);
      return 200;
    } else if (response.status === 401) {
      console.log('refresh token failed!')
      console.log(response)
      return 401;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
  }
};


// axios 보내고 401 뜨면 refresh 보내는 Hooks
// 간단하게 get / post / push 하는데서만 사용할 수 있음
// 복잡하게 데이터 변경해야하고 이런데서는 (아직 안함) 참고
const useAxios = () => {
  const [data, setData] = useState<any>();
  const [status, setStatus] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  const authHeader = () => {
    return {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json"
    };
  }

  //  axios 함수
  const sendRequest = useCallback(async (requestConfig: any) => {
    setIsLoading(true);
    // console.log('sendRequest!', requestConfig.url);
    try {
      const response = await axios(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: authHeader(),
        data: requestConfig.data && JSON.stringify(requestConfig.data),
        params: requestConfig.params,
        
        // status 받는 경우 -> status + 401
        // status 안받는 경우 -> api 명세 보고 고쳐야할듯
        validateStatus: (status) => {
          if (requestConfig.validatedateStatus) {
            return (
              requestConfig.validatedateStatus.includes(status) ||
              status === 401
            );
          } else {
            return status === 200 || status === 204 || status === 401;
          }
        }
      });

      // 1. unauthorized 401 (access 만료)
      // refresh axios
      if (response.status === 401) {
        console.log("unauthorized!-> refresh!");
        const refreshResponse = await getRefreshToken();

        // 1.1 refresh 성공한 경우 -> 다시 sendRequest
        if (refreshResponse === 200) {
          // console.log("refresh access!");
          sendRequest(requestConfig);
        }
        // 1.2 access token 못받은 경우 (refresh 만료)
        else {
          alert("세션이 만료되었습니다.");
          // logout -> landing page

        }
      }

      // 2. validate Status인 경우
      else {
        // console.log("axios success!");
        setData(response.data);
        setStatus(response.status);
      }
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err) && err.response) {setStatus(err.response.status)}
    }
    setIsLoading(false);
  }, []);
  return { data, status, isLoading, sendRequest };
}

export default useAxios;
