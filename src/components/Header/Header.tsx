import { useRef } from 'react';

import Modal, { ModalHandle } from '../../ui/Modal/Modal';
import NewTransducer from '../NewTransducer/NewTransducer';
import Button from '../../ui/Button/Button';
import { Transducer } from '../../data/data';
import styles from './Header.module.css';

type HeaderProps = {
  onAddTransducer: (transducer: Transducer) => void;
};

const Header = ({onAddTransducer}: HeaderProps) => {
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
        {<NewTransducer onCloseModal={handleCloseAddTransducer} onNewTransducer={onAddTransducer} />}
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
