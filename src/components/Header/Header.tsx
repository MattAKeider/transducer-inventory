import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAddHome, MdLogin, MdLogout } from 'react-icons/md';

import { UserContext } from '../../context/user-context';
import Modal, { ModalHandle } from '../../ui/Modal/Modal';
import NewTransducer from '../NewTransducer/NewTransducer';
import Button from '../../ui/Button/Button';
import styles from './Header.module.css';

const Header = () => {
  const { isLoggedIn, username, logout, login } = useContext(UserContext);
  const modalRef = useRef<ModalHandle>();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('token'));

    if (storedToken && storedToken.token && new Date(storedToken.expiration) > new Date()) {
      login(storedToken.token, new Date(storedToken.expiration), username);
    }
  }, [login]);

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
            {isLoggedIn && <p className={styles.welcome}>Welcome, {username}!</p>}
            {isLoggedIn && <Button className={styles.button} onClick={handleOpenAddTransducer}><MdAddHome/> Add</Button>}
            {!isLoggedIn && <Button className={styles.button} onClick={handleLogin}><MdLogin/> Login</Button>}
            {isLoggedIn && <Button className={styles.button} onClick={logout}><MdLogout/> Logout</Button>}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
