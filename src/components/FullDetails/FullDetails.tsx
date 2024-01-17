import { useRef, useState } from 'react';

import { Transducer, TransducerCondition } from '../../data/data';
import Modal, { ModalHandle } from '../../ui/Modal/Modal';
import { formatDate } from '../../utils/utils';
import EditTransducer from '../EditTransducer/EditTransducer';
import Button from '../../ui/Button/Button';
import Condition from '../Condition/Condition';
import styles from './FullDetails.module.css';

type FullDetailsProps = {
  transducer: Transducer;
  onCloseModal: () => void;
};

const FullDetails = ({ transducer, onCloseModal }: FullDetailsProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const modalRef = useRef<ModalHandle>();

  const handleClickEditTransducer = () => {
    // Close previous FullDetails modal
    onCloseModal();
    setIsEdit(true);
    modalRef.current.open();
  };

  const handleCloseEditTransducer = () => {
    modalRef.current.close();
  };

  return (
    <>
      <Modal ref={modalRef}>
        {isEdit && <EditTransducer transducer={transducer} onCloseModal={handleCloseEditTransducer} />}
      </Modal>
      <div className={styles.full_details_container}>
        <div className={styles.main_details}>
          <div className={styles.name_container}>
            <h1 className={styles.name}>{transducer.name}</h1>
          </div>
          <p data-testid="location">
            <span>Location:</span>
            {transducer.location}
          </p>
          <p data-testid="department">
            <span>Department:</span>
            {transducer.department}
          </p>
          <p data-testid="type">
            <span>Type:</span>
            {transducer.transducerType}
          </p>
          <p data-testid="room">
            <span>Room:</span>
            {transducer.room}
          </p>
          <p data-testid="serial">
            <span>Serial #:</span>
            {transducer.serialNumber}
          </p>
          <p data-testid="internal">
            <span>Internal Identifier:</span>
            {transducer.internalIdentifier}
          </p>
          <p data-testid="control">
            <span>Control #:</span>
            {transducer.controlNumber}
          </p>
          <p data-testid="date-received">
            <span>Date Received:</span>
            {formatDate(transducer.dateReceived)}
          </p>
        </div>
        <fieldset className={styles.condition_field}>
          <legend className={styles.legend}>Condition log</legend>
          {transducer.currentCondition.map((condition: TransducerCondition) => (
            <Condition
              key={condition.conditionId}
              transducerCondition={condition}
            />
          ))}
        </fieldset>
        <div className={styles.button_container}>
          <Button onClick={handleClickEditTransducer}>Edit</Button>
          <Button onClick={onCloseModal}>Close</Button>
        </div>
      </div>   
    </>
  );
};

export default FullDetails;
