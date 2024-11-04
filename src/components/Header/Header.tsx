import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAddHome, MdLogin, MdLogout, MdMenu, MdClose } from 'react-icons/md';

import { UserContext } from '../../context/UserContext';
import Modal, { ModalHandle } from '../../ui/Modal/Modal';
import NewTransducer from '../NewTransducer/NewTransducer';
import Button from '../../ui/Button/Button';
import styles from './Header.module.css';

type Token = { token: string, expiration: string };

const Header = () => {
  const { isLoggedIn, username, logout, login } = useContext(UserContext);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const showNew = useRef<boolean>(false);
  const modalRef = useRef<ModalHandle>();

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken: Token = JSON.parse(localStorage.getItem('token'));
    const storedUsername: string = JSON.parse(localStorage.getItem('username'));

    if (
      storedToken?.token &&
      new Date(storedToken?.expiration) > new Date()
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
    showNew.current = true;
    modalRef.current.open();
    isMobile && handleClickMobileNav();
  };

  const handleCloseAddTransducer = () => {
    modalRef.current.close();
    showNew.current = false;
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
      {isLoggedIn && (
        <>
          <p className={styles.welcome}>Welcome, {username}!</p>
          <Button className={styles.button} onClick={handleOpenAddTransducer}>
            <MdAddHome /> Add
          </Button>
          <Button className={styles.button} onClick={handleLogout}>
            <MdLogout /> Logout
          </Button>
        </>
      )}
      {!isLoggedIn && (
        <Button className={styles.button} onClick={handleLogin}>
          <MdLogin /> Login
        </Button>
      )}
    </nav>
  );

  return (
    <>
      <Modal ref={modalRef}>
        {showNew.current && <NewTransducer onCloseModal={handleCloseAddTransducer} />}
      </Modal>
      <header className={styles.header}>
        <h1 className={styles.title}>Transducer Inventory</h1>
        {isMobile && (
          <>
            <MdMenu className={styles.menu} onClick={handleClickMobileNav} data-testid='menu' />
            {showMobileNav && navigation}
          </>
        )}
        {!isMobile && navigation}
      </header>
    </>
  );
};

export default Header;
