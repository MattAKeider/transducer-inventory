import { useRef } from 'react';

import Modal, { ModalHandle } from '../../ui/Modal/Modal';
import styles from './Header.module.css';
import NewTransducer from '../NewTransducer/NewTransducer';
import Button from '../../ui/Button/Button';

const Header = () => {
  const modalRef = useRef<ModalHandle>();

  const handleOpenAddTransducer = () => {
    modalRef.current.open();
  };

  return (
    <>
      <Modal ref={modalRef}>
        {<NewTransducer />}
      </Modal>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Transducer Inventory</h1>
          <nav className={styles.navbar}>
            <Button onClick={handleOpenAddTransducer}>Add Item</Button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
