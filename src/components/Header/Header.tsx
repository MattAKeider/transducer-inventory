import { useRef } from 'react';

import Modal, { ModalHandle } from '../../ui/Modal/Modal';
import TransducerForm from '../TransducerForm/TransducerForm';
import Button from '../../ui/Button/Button';
import styles from './Header.module.css';

const Header = () => {
  const modalRef = useRef<ModalHandle>();

  const handleOpenAddTransducer = () => {
    modalRef.current.open();
  };

  const handleCloseAddTransducer = () => {
    modalRef.current.close();
  };

  return (
    <>
      <Modal ref={modalRef}>
        {<TransducerForm onCloseModal={handleCloseAddTransducer} />}
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
