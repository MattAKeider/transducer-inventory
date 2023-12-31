import { useState, useRef } from 'react';

import TransducerItem from '../TransducerItem/TransducerItem';
import styles from './Transducers.module.css';
import { TRANSDUCERS, Transducer } from '../../data/data';
import Modal, { ModalHandle } from '../../ui/Modal/Modal';

const Transducers = () => {
  const [transducers, setTransducers] = useState(TRANSDUCERS);
  const [selectedTransducer, setSelectedTransducer] = useState<Transducer | undefined>();
  const dialog = useRef<ModalHandle>();

  const handleClickedTransducer = (selectedTransducer: Transducer) => {
    setSelectedTransducer(selectedTransducer);
    dialog.current.open();
  };

  return (
    <>
      <Modal ref={dialog}>
        {selectedTransducer && <h2>{selectedTransducer.name}</h2>}
      </Modal>
      <ul className={styles.container}>
        {transducers.map((transducer: Transducer) => (
          <TransducerItem
            key={transducer.controlNumber}
            transducerData={transducer}
            onClickTransducer={() => handleClickedTransducer(transducer)}
          />
        ))}
      </ul>
    </>
  );
};

export default Transducers;
