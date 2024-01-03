import { TransducerCondition } from '../../data/data';
import { formatDate } from '../../utils';
import styles from './Condition.module.css';

type ConditionProps = {
  transducerCondition: TransducerCondition;
};

const Condition = ({ transducerCondition }: ConditionProps) => {
  return (
    <div className={styles.condition_container}>
      <p data-testid="condition">
        <span>Condition: </span>
        {transducerCondition.condition}
      </p>
      <p data-testid="date">
        <span>Date Changed: </span>
        {formatDate(transducerCondition.conditionChangedDate)}
      </p>
      <p data-testid="refurbished">
        <span>Refurbished: </span>
        {transducerCondition.isRefurbished ? 'Yes' : 'No'}
      </p>
      <hr />
    </div>
  );
};

export default Condition;
