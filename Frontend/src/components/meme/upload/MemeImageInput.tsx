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
    if (file.size > 200 * 1024 * 1024) return alert("이미지가 너무 큽니다");
    setImgFile(file);

    // img 미리보기
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setImgSrc(result);
        dispatch(memeUploadActions.putImgUrl(result));
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
      <div className={styles.inputContainer}>
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
              {imgFile && `${getByteSize(imgFile.size)}`} / 200 MB
            </div>
          </div>
          <hr className={styles.headerLine} />
        </div>

        {/* content */}
        <div className={styles.contentContainer}>
          {imgSrc && <img src={imgSrc} alt="" className={styles.contentImg} />}
          {!imgSrc && (
            <p>텍스트 밈을 설명할 이미지 혹은 이미지 밈을 등록하세요.</p>
          )}
        </div>
      </div>

      <p className={styles.explanation}>유해성 검사를 통과하지 못했습니다.</p>
    </div>
  );
};

export default MemeImageInput;
