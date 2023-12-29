import { useState } from 'react';

import styles from './TransducerItem.module.css';
import { TRANSDUCERS, Transducer } from '../../data/data';

const TransducerItem = () => {
  const [transducers, setTransducers] = useState(TRANSDUCERS);

  return (
    <>
      {transducers.map((transducer: Transducer) => {
        return (
          <li className={styles.list_item} key={transducer.serialNumber}>
            <h2 className={styles.card_title}>{transducer.name}</h2>
            <p>
              <span>Location:</span> {transducer.location}
            </p>
            <p>
              <span>Room:</span> {transducer.room}
            </p>
            <p>
              <span>S #:</span> {transducer.serialNumber}
            </p>
            <p>
              <span>Control #:</span> {transducer.controlNumber}
            </p>
          </li>
        );
      })}
    </>
  );
};

export default TransducerItem;
