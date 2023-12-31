import { Transducer, TransducerState } from '../../data/data';
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
        <p>
          <span>Location: </span>
          {transducer.location}
        </p>
        <p>
          <span>Department: </span>
          {transducer.department}
        </p>
        <p>
          <span>Room: </span>
          {transducer.room}
        </p>
        <p>
          <span>Serial Number: </span>
          {transducer.serialNumber}
        </p>
        <p>
          <span>Internal Identifier: </span>
          {transducer.internalIdentifier}
        </p>
        <p>
          <span>Control Number: </span>
          {transducer.controlNumber}
        </p>
        <p>
          <span>Date Received: </span>
          {formatDate(transducer.dateReceived)}
        </p>
        <p>
          <span>Received State: </span>
          {transducer.receivedState}
        </p>
      </div>
      <fieldset className={styles.state_field}>
        <legend className={styles.legend}>Current State:</legend>
        {transducer.currentState.map((state: TransducerState) => (
          <Condition key={generateKey()} transducerState={state} />
        ))}
      </fieldset>
      <div className={styles.button_container}>
        <button className={styles.close_modal} onClick={onCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default FullDetails;
