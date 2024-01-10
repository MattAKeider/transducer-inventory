import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

export type ModalHandle = {
  open: () => void;
  close: () => void;
};

type ModalProps = {
  children: ReactNode;
};

const Modal = forwardRef<ModalHandle, ModalProps>(({ children }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>();

  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current.showModal();
    },
    close: () => {
      dialogRef.current.close();
    }
  }));

  return createPortal(
    <dialog className={styles.modal} ref={dialogRef}>{children}</dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
