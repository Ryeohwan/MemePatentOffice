import { useState, useEffect } from "react";
import useAxios from "hooks/useAxios";
import styles from "./NicknameInput.module.css";

interface Props {
  nickname: string;
  nicknameLoading: boolean;
  setNicknameLoading: (arg0: boolean) => void;
  nicknameState: boolean;
  setNicknameState: (arg0: boolean) => void;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NicknameInput: React.FC<Props> = ({
  nickname,
  nicknameLoading,
  setNicknameLoading,
  setNicknameState,
  changeHandler,
}) => {
  const [errorMsg, setErrorMsg] = useState("");

  // 중복검사 api
  const { data, isLoading, sendRequest } = useAxios();

  // nickname 유효성 검사 함수
  const nickNameCheck = (checkNickname: string) => {
    // 1. 영어 + 한글 + 숫자만
    if (!checkNickname.match(/^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9 ]+$/)) {
      setErrorMsg("영어 한글 숫자로만 입력해주세요.");
      return false;
    }
    // 2. 최대 60글자
    if (checkNickname.length > 10) {
      setErrorMsg("최대 10글자로 입력해주세요.");
      return false;
    }
    // 3. MEME으로 시작하는지
    if (checkNickname.startsWith("MEME")) {
      setErrorMsg("닉네임은 MEME으로 시작하실 수 없습니다.");
      return false;
    }
    // 모두 통과한 경우
    setErrorMsg("");
    return true;
  };

  // nickname 변할때마다
  useEffect(() => {
    setErrorMsg("");
    const checkNickname = nickname.trim()

    if (!checkNickname) {
      setNicknameState(true);
      setNicknameLoading(false);
      return;
    }

    // key up 1초 후 유효성 검사
    // 유효성검사 통과하면 중복검사
    setNicknameLoading(true);
    const identifier = setTimeout(() => {
      const checkRes = nickNameCheck(checkNickname);
      if (checkRes) {
        sendRequest({ url: `/api/mpoffice/user/nickName/${checkNickname}` });
      } else {
        setNicknameState(false);
        setNicknameLoading(false);
      }
    }, 1000);
    return () => {
      clearTimeout(identifier);
    };
  }, [nickname]);

  // 중복검사 api 보낸 후 실행
  useEffect(() => {
    if (!nickname || isLoading) return;
    setNicknameLoading(false);
    if (data) {
      setNicknameState(true);
    } else {
      setNicknameState(false);
      setErrorMsg("중복된 닉네임입니다.");
    }
  }, [isLoading]);

  return (
    <>
      <div
        className={`${styles.inputContainer} ${errorMsg && styles.errorBox}`}
      >
        <input
          className={styles.inputBox}
          value={nickname}
          onChange={changeHandler}
          placeholder={JSON.parse(sessionStorage.user).nickname}
        />

        {nicknameLoading && (
          <div className={styles.spinnerContainer}>
            <i className="pi pi-spin pi-spinner" />
          </div>
        )}
      </div>

      <div className={`${styles.errorMsg}`}>{errorMsg}</div>
    </>
  );
};

export default NicknameInput;
