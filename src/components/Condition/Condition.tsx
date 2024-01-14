import { TransducerCondition } from '../../data/data';
import { formatDate } from '../../utils/utils';
import styles from './Condition.module.css';

type ConditionProps = {
  transducerCondition: TransducerCondition;
};

const Condition = ({ transducerCondition }: ConditionProps) => {
  return (
    <div className={styles.condition_container}>
      <p data-testid="condition">
        <span>Condition:</span>
        {transducerCondition.condition}
      </p>
      <p data-testid="date">
        <span>Date Changed:</span>
        {formatDate(transducerCondition.conditionChangedDate)}
      </p>
      {transducerCondition.note !== '' && (
        <p data-testid="saved-note">
          <span>Note:</span>
          {transducerCondition.note}
        </p>
      )}
      <hr />
    </div>
  );
};

export default Condition;
