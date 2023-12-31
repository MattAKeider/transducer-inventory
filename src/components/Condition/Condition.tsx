import { TransducerState } from '../../data/data';
import { formatDate } from '../../utils';
import styles from './Condition.module.css';

type ConditionProps = {
  transducerState: TransducerState;
};

const Condition = ({ transducerState }: ConditionProps) => {
  return (
    <div className={styles.condition_container}>
      <p>
        <span>Condition: </span>
        {transducerState.condition}
      </p>
      <p>
        <span>Date Changed: </span>
        {formatDate(transducerState.stateChangedDate)}
      </p>
      <p>
        <span>Refurbished: </span>
        {transducerState.isRefurbished ? 'Yes' : 'No'}
      </p>
      <hr />
    </div>
  );
};

export default Condition;
