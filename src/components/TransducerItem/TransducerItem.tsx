import { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';

import { UserContext, UserContextType } from '../../context/UserContext';
import { Transducer } from '../../models/model';
import styles from './TransducerItem.module.css';

interface Props {
  transducerData: Transducer;
  onClickTransducer: () => void;
  onClickDelete: (event: React.MouseEvent<SVGAElement>) => void;
}

const TransducerItem = ({
  transducerData,
  onClickTransducer,
  onClickDelete,
}: Props) => {
  const { isLoggedIn } = useContext<UserContextType>(UserContext);

  return (
    <li className={styles.transducer} onClick={onClickTransducer}>
      {isLoggedIn && (
        <TiDelete className={styles.delete} onClick={onClickDelete} data-testid='delete' />
      )}
      <h3 className={styles.item_title}>{transducerData.name}</h3>
      <p className={styles.item_info}>
        <span>Location: </span>
        {transducerData.location}
      </p>
      <p className={styles.item_info}>
        <span>Room: </span>
        {transducerData.room}
      </p>
      <p className={styles.item_info}>
        <span>S #: </span>
        {transducerData.serialNumber}
      </p>
      <p className={styles.item_info}>
        <span>Control #: </span>
        {transducerData.controlNumber}
      </p>
    </li>
  );
};

export default TransducerItem;
