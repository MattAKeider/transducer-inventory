import { useState } from 'react';

import TransducerItem from '../TransducerItem/TransducerItem';
import styles from './Transducers.module.css';
import { TRANSDUCERS, Transducer } from '../../data/data';

const Transducers = () => {
  const [transducers, setTransducers] = useState(TRANSDUCERS);

  return (
    <ul className={styles.container}>
      {transducers.map((transducer: Transducer) => (
        <TransducerItem
          key={transducer.serialNumber}
          transducerData={transducer}
        />
      ))}
    </ul>
  );
};

export default Transducers;
