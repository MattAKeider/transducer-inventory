import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAddHome, MdLogin } from "react-icons/md";

import Modal, { ModalHandle } from '../../ui/Modal/Modal';
import NewTransducer from '../NewTransducer/NewTransducer';
import Button from '../../ui/Button/Button';
import styles from './Header.module.css';

const Header = () => {
  const modalRef = useRef<ModalHandle>();
  const navigate = useNavigate();

  const handleOpenAddTransducer = () => {
    modalRef.current.open();
  };

  const handleCloseAddTransducer = () => {
    modalRef.current.close();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <Modal ref={modalRef}>
        {<NewTransducer onCloseModal={handleCloseAddTransducer} />}
      </Modal>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Transducer Inventory</h1>
          <nav className={styles.navbar}>
            <Button className={styles.button} onClick={handleOpenAddTransducer}><MdAddHome/> Add</Button>
            <Button className={styles.button} onClick={handleLogin}><MdLogin/> Login</Button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
