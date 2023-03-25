import React from "react";

import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";

import styles from "components/auction/upload/CheckingModal.module.css";

interface ModalProps {
  checkModalVisible: boolean;
  controlCheckModal: (visible: boolean) => void;
  textInput: string;
}
const CheckingModal: React.FC<ModalProps> = ({
  checkModalVisible,
  controlCheckModal,
  textInput,
}) => {
  return (
    <Dialog
      className={styles.modal}
      visible={checkModalVisible}
      onHide={() => controlCheckModal(false)}
      blockScroll={true}
      closable={false}
    >
      <div className={styles.wrapper}>
        <ProgressSpinner className={styles.spinner} />
        <p className={styles.bigText}>생성 중...</p>
        <p className={styles.smallText}>{textInput}</p>
      </div>
    </Dialog>
  );
};

export default CheckingModal;
