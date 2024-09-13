import { useContext } from 'react';

import { UserContext } from '../../context/UserContext';
import emptyImg from '../../assets/empty-box.png';
import styles from './EmptyScreen.module.css';

const EmptyScreen = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <section className={styles.container}>
      <img
        className={styles.image}
        src={emptyImg}
        alt="transducers are not added yet"
      />
      <div className={styles.text}>
        <p>
          {isLoggedIn
            ? 'Hmm... that add button must be important...'
            : 'Hmm... go ahead and login...'}
        </p>
      </div>
    </section>
  );
};

export default EmptyScreen;
