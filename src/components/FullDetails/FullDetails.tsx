import { MouseEvent } from 'react';

import { Transducer, TransducerCondition } from '../../data/data';
import { formatDate } from '../../utils/utils';
import Button from '../../ui/Button/Button';
import Condition from '../Condition/Condition';
import styles from './FullDetails.module.css';

type FullDetailsProps = {
  transducer: Transducer;
  onCloseModal: (event: MouseEvent<HTMLButtonElement>) => void;
};

const FullDetails = ({ transducer, onCloseModal }: FullDetailsProps) => {
  return (
    <div className={styles.full_details_container}>
      <div className={styles.main_details}>
        <h1 className={styles.name}>{transducer.name}</h1>
        <p data-testid="location">
          <span>Location:</span>
          {transducer.location}
        </p>
        <p data-testid="department">
          <span>Department:</span>
          {transducer.department}
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
        <p data-testid="notes">
          <span>Notes:</span>
          <br/>{transducer.notes}
        </p>
      </div>
      <fieldset className={styles.condition_field}>
        <legend className={styles.legend}>Condition log</legend>
        {transducer.currentCondition.map((condition: TransducerCondition) => (
          <Condition key={transducer.id} transducerCondition={condition} />
        ))}
      </fieldset>
      <div className={styles.button_container}>
        <Button onClick={onCloseModal}>Close</Button>
      </div>
    </div>
  );
};

export default FullDetails;
