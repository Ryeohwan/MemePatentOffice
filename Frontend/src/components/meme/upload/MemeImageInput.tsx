import React, { useRef, useState } from "react";
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
} from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";

import styles from "./MemeImageInput.module.css";

const MemeImageInput: React.FC = () => {
  const toast = useRef(null);
  const [size, setSize] = useState<number>(0);
  const fileUploadRef = useRef(null);

  const onTemplateSelect = (e: FileUploadSelectEvent) => {
    console.log("template select!");
    let file = e.files[0];
    setSize(file.size);
  };

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton } = options;
    const value = size / 10000;
    // const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(size) : '0 B';
    // const formatedValue = fileUploadRef && `${size} B` : '0 B';

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        <div className="flex align-items-center gap-3 ml-auto">
          {/* <span>{formatedValue} / 1 MB</span> */}
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.imageInputContainer}>
      <div className={styles.inputContainer}>
        {/* image 등록 */}
        {/* <FileUpload
          ref={fileUploadRef}
          accept="image/*"
          maxFileSize={1000000}
          onSelect={onTemplateSelect}
          onError={onTemplateClear}
          onClear={onTemplateClear}
          headerTemplate={headerTemplate}
          itemTemplate={itemTemplate}
          emptyTemplate={emptyTemplate}
          chooseOptions={chooseOptions}
          uploadOptions={uploadOptions}
          cancelOptions={cancelOptions}
        /> */}
      </div>
      <p className={styles.explanation}>
        텍스트 밈을 설명할 이미지 혹은 이미지 밈을 등록하세요.
      </p>
    </div>
  );
};

export default MemeImageInput;
