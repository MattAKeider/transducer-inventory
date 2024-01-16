import { useState, useRef, useContext } from 'react';

import { TransducerContext, TransducerContextType } from '../../store/transducer-context';
import Modal, { ModalHandle } from '../../ui/Modal/Modal';
import { Transducer } from '../../data/data';
import TransducerItem from '../TransducerItem/TransducerItem';
import FullDetails from '../FullDetails/FullDetails';
import styles from './Transducers.module.css';

const Transducers = () => {
  const [selectedTransducer, setSelectedTransducer] = useState<Transducer | undefined>();
  const { transducers } = useContext<TransducerContextType>(TransducerContext);
  const modalRef = useRef<ModalHandle>();

  const handleClickedTransducer = (selectedTransducer: Transducer) => {
    setSelectedTransducer(selectedTransducer);
    modalRef.current.open();
  };

  const handleCloseDetails = () => {
    modalRef.current.close();
  };

  return (
    <>
      <Modal ref={modalRef}>
        {selectedTransducer && <FullDetails transducer={selectedTransducer} onCloseModal={handleCloseDetails} />}
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
