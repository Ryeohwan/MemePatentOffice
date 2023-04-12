import React from "react";

import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";

import styles from "components/auction/upload/CheckingModal.module.css";

interface ModalProps {
  checkModalVisible: boolean;
  controlCheckModal: (visible: boolean) => void;
  headerInput?: string; // props 존재할수도 없을수도 있는 경우
  textInput: string;
}
const CheckingModal: React.FC<ModalProps> = ({
  checkModalVisible,
  controlCheckModal,
  headerInput = "등록 중...",
  textInput,
}) => {
  return (
    <Dialog
      className={styles.modal}
      visible={checkModalVisible}
      onHide={() => controlCheckModal(false)}
      closable={false}
    >
      <div className={styles.wrapper}>
        <ProgressSpinner className={styles.spinner} />
        <p className={styles.bigText}>{headerInput}</p>
        <p className={styles.smallText}>{textInput}</p>
      </div>
    </Dialog>
  );
};

export default CheckingModal;
