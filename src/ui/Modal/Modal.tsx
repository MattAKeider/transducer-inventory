import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

export type ModalHandle = {
  open: () => void;
  close: () => void;
};

interface Props {
  children: React.ReactNode;
}

const Modal = forwardRef<ModalHandle, Props>(({ children }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>();

  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current.showModal();
    },
    close: () => {
      dialogRef.current.close();
    },
  }));

  return createPortal(
    <div className={styles.container}>
      <dialog className={styles.modal} ref={dialogRef}>
        {children}
      </dialog>
    </div>,
    document.getElementById('modal')
  );
});

export default Modal;
