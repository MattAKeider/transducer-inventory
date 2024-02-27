import { TiDelete } from 'react-icons/ti';

import { UserContext, UserContextType } from '../../context/user-context';
import { Transducer } from '../../data/data';
import { useContext } from 'react';
import styles from './TransducerItem.module.css';

type TransducerItemProps = {
  transducerData: Transducer;
  onClickTransducer: () => void;
  onClickDelete: (event: React.MouseEvent<SVGAElement>) => void;
};

const TransducerItem = ({ transducerData, onClickTransducer, onClickDelete }: TransducerItemProps) => {
  const { isLoggedIn } = useContext<UserContextType>(UserContext);

  return (
    <li className={styles.list_item} onClick={onClickTransducer}>
      {isLoggedIn && <TiDelete className={styles.delete} onClick={onClickDelete} />}
      <h2 className={styles.card_title}>{transducerData.name}</h2>
      <p>
        <span>Location: </span>{transducerData.location}
      </p>
      <p>
        <span>Room: </span>{transducerData.room}
      </p>
      <p>
        <span>S #: </span>{transducerData.serialNumber}
      </p>
      <p>
        <span>Control #: </span>{transducerData.controlNumber}
      </p>
    </li>
  );
};

export default TransducerItem;
