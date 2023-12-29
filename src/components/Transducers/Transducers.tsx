import TransducerItem from '../TransducerItem/TransducerItem';
import styles from './Transducers.module.css';

const Transducers = () => {
  return (
    <ul className={styles.container}>
      <TransducerItem />
    </ul>
  );
};

export default Transducers;