import { Transducer, TransducerCondition } from '../../data/data';
import { formatDate, generateKey } from '../../utils';
import Condition from '../Condition/Condition';
import styles from './FullDetails.module.css';

type FullDetailsProps = {
  transducer: Transducer;
  onCloseModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const FullDetails = ({ transducer, onCloseModal }: FullDetailsProps) => {
  return (
    <div className={styles.full_details_container}>
      <div className={styles.main_details}>
        <h2 className={styles.name}>{transducer.name}</h2>
        <p data-testid="location">
          <span>Location: </span>
          {transducer.location}
        </p>
        <p data-testid="department">
          <span>Department: </span>
          {transducer.department}
        </p>
        <p data-testid="room">
          <span>Room: </span>
          {transducer.room}
        </p>
        <p data-testid="serial">
          <span>Serial Number: </span>
          {transducer.serialNumber}
        </p>
        <p data-testid="internal">
          <span>Internal Identifier: </span>
          {transducer.internalIdentifier}
        </p>
        <p data-testid="control">
          <span>Control Number: </span>
          {transducer.controlNumber}
        </p>
        <p data-testid="dateReceived">
          <span>Date Received: </span>
          {formatDate(transducer.dateReceived)}
        </p>
        <p data-testid="notes">
          <span>Received Condition Note:</span>
          <br/>{transducer.receivedConditionNote}
        </p>
      </div>
      <fieldset className={styles.condition_field}>
        <legend className={styles.legend}>Current Condition</legend>
        {transducer.currentCondition.map((condition: TransducerCondition) => (
          <Condition key={generateKey()} transducerCondition={condition} />
        ))}
      </fieldset>
      <div className={styles.button_container}>
        <button className={styles.close_modal} onClick={onCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default FullDetails;
