import { TransducerCondition } from '../../data/data';
import { formatDate } from '../../utils/utils';
import styles from './Condition.module.css';

type ConditionProps = {
  transducerCondition: TransducerCondition;
};

const Condition = ({ transducerCondition }: ConditionProps) => {
  return (
    <div className={styles.condition_container}>
      <p className={styles.info} data-testid="condition">
        <span>Condition:</span>
        {transducerCondition.condition}
      </p>
      <p className={styles.info} data-testid="date">
        <span>Date Changed:</span>
        {formatDate(transducerCondition.conditionChangedDate)}
      </p>
      {transducerCondition.note !== '' && (
        <p className={styles.info} data-testid="saved-note">
          <span>Note:</span>
          {transducerCondition.note}
        </p>
      )}
      <hr className={styles.line} />
    </div>
  );
};

export default Condition;
