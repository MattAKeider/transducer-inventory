import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAddHome, MdLogin, MdLogout, MdMenu, MdClose } from 'react-icons/md';

import { UserContext } from '../../context/UserContext';
import Modal, { ModalHandle } from '../../ui/Modal/Modal';
import NewTransducer from '../NewTransducer/NewTransducer';
import Button from '../../ui/Button/Button';
import styles from './Header.module.css';

const Header = () => {
  const { isLoggedIn, username, logout, login } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const modalRef = useRef<ModalHandle>();

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('token'));
    const storedUsername = JSON.parse(localStorage.getItem('username'));

    if (
      storedToken &&
      storedToken.token &&
      new Date(storedToken.expiration) > new Date()
    ) {
      login(
        storedToken.token,
        new Date(storedToken.expiration),
        storedUsername
      );
    }
  }, []);

  useEffect(() => {
    const checkSize = () => {
      window.innerWidth > 896 ? setIsMobile(false) : setIsMobile(true);
    };

    checkSize();
    window.addEventListener('resize', checkSize);

    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, []);

  const handleClickMobileNav = () => {
    setShowMobileNav((prevState) => !prevState);
  };

  const handleOpenAddTransducer = () => {
    setShowNew(true);
    modalRef.current.open();
    isMobile && handleClickMobileNav();
  };

  const handleCloseAddTransducer = () => {
    modalRef.current.close();
    setShowNew(false);
  };

  const handleLogin = () => {
    navigate('/login');
    isMobile && handleClickMobileNav();
  };

  const handleLogout = () => {
    logout();
    isMobile && handleClickMobileNav();
  };

  const navigation = (
    <nav className={styles.navbar}>
      {isMobile && (
        <MdClose className={styles.close} onClick={handleClickMobileNav} />
      )}
      {isLoggedIn && <p className={styles.welcome}>Welcome, {username}!</p>}
      {isLoggedIn && (
        <Button className={styles.button} onClick={handleOpenAddTransducer}>
          <MdAddHome /> Add
        </Button>
      )}
      {!isLoggedIn && (
        <Button className={styles.button} onClick={handleLogin}>
          <MdLogin /> Login
        </Button>
      )}
      {isLoggedIn && (
        <Button className={styles.button} onClick={handleLogout}>
          <MdLogout /> Logout
        </Button>
      )}
    </nav>
  );

  return (
    <>
      <Modal ref={modalRef}>
        {showNew && <NewTransducer onCloseModal={handleCloseAddTransducer} />}
      </Modal>
      <header className={styles.header}>
        <h1 className={styles.title}>Transducer Inventory</h1>
        {isMobile && (
          <MdMenu className={styles.menu} onClick={handleClickMobileNav} />
        )}
        {(!isMobile || showMobileNav) && navigation}
      </header>
    </>
  );
};

export default Header;
