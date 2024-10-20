import { useContext, useEffect, useRef, useState } from 'react';

import { Transducer, TransducerCondition } from '../../models/model';
import Modal, { ModalHandle } from '../../ui/Modal/Modal';
import { formatDate } from '../../utils/utils';
import EditTransducer from '../EditTransducer/EditTransducer';
import Button from '../../ui/Button/Button';
import Condition from '../Condition/Condition';
import useHttp from '../../hooks/useHttp';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import { UserContext } from '../../context/UserContext';
import styles from './FullDetails.module.css';

type FullDetailsProps = {
  transducer: Transducer;
  onCloseModal: () => void;
};

const FullDetails = ({ transducer, onCloseModal }: FullDetailsProps) => {
  const [conditions, setConditions] = useState<TransducerCondition[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { isLoggedIn } = useContext(UserContext);
  const { isLoading, error, sendRequest } = useHttp();

  const modalRef = useRef<ModalHandle>();

  const id = transducer.id;

  useEffect(() => {
    async function getConditions() {
      const responseData = await sendRequest(`${import.meta.env.VITE_API_URL}/conditions/${id}`);

      if (responseData) {
        setConditions(responseData.conditions.reverse());
      }
    }

    getConditions();
  }, [transducer]);

  const handleClickEditTransducer = () => {
    // Close previous FullDetails modal
    onCloseModal();
    setIsEdit(true);
    modalRef.current.open();
  };

  const handleCloseEditTransducer = () => {
    modalRef.current.close();
    setIsEdit(false);
  };

  return (
    <>
      <Modal ref={modalRef}>
        {isEdit && (
          <EditTransducer
            transducer={transducer}
            condition={conditions[0].condition}
            onCloseModal={handleCloseEditTransducer}
          />
        )}
      </Modal>

      <LoadingSpinner loading={isLoading} />
      <div className={styles.main_details}>
        <div className={styles.name_container}>
          <h2 className={styles.name}>{transducer.name}</h2>
        </div>
        <p className={styles.info} data-testid="location">
          <span>Location:</span>
          {transducer.location}
        </p>
        <p className={styles.info} data-testid="department">
          <span>Department:</span>
          {transducer.department}
        </p>
        <p className={styles.info} data-testid="type">
          <span>Type:</span>
          {transducer.transducerType}
        </p>
        <p className={styles.info} data-testid="room">
          <span>Room:</span>
          {transducer.room}
        </p>
        <p className={styles.info} data-testid="serial">
          <span>Serial #:</span>
          {transducer.serialNumber}
        </p>
        <p className={styles.info} data-testid="internal">
          <span>Internal Identifier:</span>
          {transducer.internalIdentifier}
        </p>
        <p className={styles.info} data-testid="control">
          <span>Control #:</span>
          {transducer.controlNumber}
        </p>
        <p className={styles.info} data-testid="date-received">
          <span>Date Received:</span>
          {formatDate(transducer.dateReceived)}
        </p>
      </div>
      <fieldset className={styles.condition_field}>
        <legend className={styles.legend}>Condition log</legend>
        {!isLoading && error && (
          <ErrorMessage errorMessage="Error loading..." />
        )}
        {!isLoading &&
          !error &&
          conditions.map((condition: TransducerCondition) => (
            <Condition key={condition.id} transducerCondition={condition} />
          ))}
      </fieldset>
      <div className={styles.button_container}>
        {isLoggedIn && (
          <Button onClick={handleClickEditTransducer}>Edit</Button>
        )}
        <Button onClick={onCloseModal}>Close</Button>
      </div>
    </>
  );
};

export default FullDetails;
