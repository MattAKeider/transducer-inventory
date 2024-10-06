import { TiDelete } from 'react-icons/ti';

import { UserContext, UserContextType } from '../../context/UserContext';
import { Transducer } from '../../models/model';
import { useContext } from 'react';
import styles from './TransducerItem.module.css';

type TransducerItemProps = {
  transducerData: Transducer;
  onClickTransducer: () => void;
  onClickDelete: (event: React.MouseEvent<SVGAElement>) => void;
};

const TransducerItem = ({
  transducerData,
  onClickTransducer,
  onClickDelete,
}: TransducerItemProps) => {
  const { isLoggedIn } = useContext<UserContextType>(UserContext);

  return (
    <li className={styles.transducer} onClick={onClickTransducer}>
      {isLoggedIn && (
        <TiDelete className={styles.delete} onClick={onClickDelete} />
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
