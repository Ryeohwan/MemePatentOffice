import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memeUploadActions } from "store/memeUpload";
import { RootState } from "store/configStore";

import styles from "./MemeImageInput.module.css";

const MemeImageInput: React.FC = () => {
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const imgState = useSelector<RootState, number>(
    (state) => state.memeUpload.imgState
  );

  // 파일 크기 변환
  const getByteSize = (size: number) => {
    const byteUnits = ["KB", "MB"];
    for (let i = 0; i < byteUnits.length; i++) {
      size = Math.floor(size / 1024);
      if (size < 1024) return size.toFixed(1) + " " + byteUnits[i];
    }
  };

  // upload img handler
  const onUploadImg = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (!target.files) return;

    const file: File = target.files[0];

    // 파일 크기 maximum
    if (file.size > 4 * 1024 * 1024) {
      alert("이미지가 너무 큽니다.")
      return;
    };

    // 파일 pixel minimum + 미리보기
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;

      if (typeof result === "string") {
        // 파일 pixel minimum 체크
        let img = new Image();
        img.src = result;

        img.onload = () => {
          if (img.height < 128 || img.width < 128) {
            alert("이미지가 너무 작습니다.");
          } else {
            // 사진 유효성 검사 모두 통과한 경우
            setImgFile(file);
            setImgSrc(result);
            dispatch(memeUploadActions.putImgUrl(result));
            // 유해성검사 실패해서 돌아왔는데, input 바뀐 경우 -> -1로 변경
            if (imgState === 0) dispatch(memeUploadActions.setImgState(-1));
          }
        };
      }
    };
  };

  // file upload handler
  const handleClick = (e: React.MouseEvent) => {
    if (fileInput?.current) {
      fileInput.current.click();
    }
  };

  // 디자인 추후 수정 예정
  return (
    <div className={styles.imageInputContainer}>
      <div
        className={`${styles.inputContainer} ${
          imgState === 0 && styles.errorBox
        }`}
      >
        {/* header */}
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            <div className={styles.headerBtn}>
              <div className={styles.customInputBtn} onClick={handleClick}>
                파일 선택
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                onChange={onUploadImg}
                className={styles.inputBtn}
              />
            </div>
            <div className={styles.headerInfo}>
              {imgFile && `${getByteSize(imgFile.size)}`} / 4 MB
            </div>
          </div>
          <hr className={styles.headerLine} />
        </div>

        {/* content */}
        <div className={styles.contentContainer}>
          {imgSrc && <img src={imgSrc} alt="" className={styles.contentImg} />}
          {!imgSrc && (
            <>
              <div>텍스트 밈을 설명할 이미지 혹은 이미지 밈을 등록하세요.</div>
              <div>128 * 128 이상으로 올려주세요.</div>
            </>
          )}
        </div>
      </div>

      <div className={styles.errorMsg}>
        {imgState === 0 && <p>유해성 검사를 통과하지 못했습니다.</p>}
      </div>
    </div>
  );
};

export default MemeImageInput;
