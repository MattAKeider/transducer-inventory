import { Transducer } from '../../data/data';
import styles from './TransducerItem.module.css';

type TransducerItemProps = {
  transducerData: Transducer;
};

const TransducerItem = ({ transducerData }: TransducerItemProps) => {
  return (
    <li className={styles.list_item} key={transducerData.serialNumber}>
      <h2 className={styles.card_title}>{transducerData.name}</h2>
      <p>
        <span>Location:</span> {transducerData.location}
      </p>
      <p>
        <span>Room:</span> {transducerData.room}
      </p>
      <p>
        <span>S #:</span> {transducerData.serialNumber}
      </p>
      <p>
        <span>Control #:</span> {transducerData.controlNumber}
      </p>
    </li>
  );
};

export default TransducerItem;
