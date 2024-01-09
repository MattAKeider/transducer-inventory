import { useState, useRef, useContext } from 'react';

import Modal, { ModalHandle } from '../../ui/Modal/Modal';
import TransducerItem from '../TransducerItem/TransducerItem';
import { Transducer } from '../../data/data';
import FullDetails from '../FullDetails/FullDetails';
import { TransducerContext, TransducerContextType } from '../../store/transducer-context';
import styles from './Transducers.module.css';

const Transducers = () => {
  const { transducers } = useContext<TransducerContextType>(TransducerContext);
  const [selectedTransducer, setSelectedTransducer] = useState<Transducer | undefined>();
  const dialog = useRef<ModalHandle>();

  const handleClickedTransducer = (selectedTransducer: Transducer) => {
    setSelectedTransducer(selectedTransducer);
    dialog.current.open();
  };

  const handleCloseModal = () => {
    dialog.current.close();
  };

  return (
    <>
      <Modal ref={dialog}>
        {selectedTransducer && <FullDetails transducer={selectedTransducer} onCloseModal={handleCloseModal} />}
      </Modal>
      <ul className={styles.container}>
        {transducers.map((transducer: Transducer) => (
          <TransducerItem
            key={transducer.id}
            transducerData={transducer}
            onClickTransducer={() => handleClickedTransducer(transducer)}
          />
        ))}
      </ul>
    </>
  );
};

export default Transducers;
