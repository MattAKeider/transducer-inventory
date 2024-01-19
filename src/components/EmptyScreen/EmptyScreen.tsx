import emptyImg from '../../assets/empty-box.png';
import styles from './EmptyScreen.module.css';

const EmptyScreen = () => {
  return (
    <section className={styles.container}>
      <img className={styles.image} src={emptyImg} alt="transducers are not added yet" />
      <div className={styles.text}>
        <p>"Hmm... that add button must be important..."</p>
      </div>
    </section>
  );
};

export default EmptyScreen;