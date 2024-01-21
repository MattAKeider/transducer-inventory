import { useState, useRef, useContext, useEffect } from 'react';

import {
  TransducerContext,
  TransducerContextType,
} from '../../store/transducer-context';
import Modal, { ModalHandle } from '../../ui/Modal/Modal';
import { Transducer } from '../../data/data';
import TransducerItem from '../TransducerItem/TransducerItem';
import FullDetails from '../FullDetails/FullDetails';
import EmptyScreen from '../EmptyScreen/EmptyScreen';
import Search from '../Search/Search';
import styles from './Transducers.module.css';

const Transducers = () => {
  const { transducers, deleteTransducer } = useContext<TransducerContextType>(TransducerContext);
  const [selectedTransducer, setSelectedTransducer] = useState<Transducer | undefined>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredTransducers, setFilteredTransducers] = useState<Transducer[]>(transducers);
  const modalRef = useRef<ModalHandle>();

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = transducers.filter((transducers: Transducer) => {
        return transducers.location.toLowerCase().includes(searchValue.toLowerCase());
      });
  
      setFilteredTransducers(filtered);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, transducers]);

  const handleClickedTransducer = (selectedTransducer: Transducer) => {
    setSelectedTransducer(selectedTransducer);
    modalRef.current.open();
  };

  const handleDeleteTransducer = (id: string, name: string, event: React.MouseEvent<SVGAElement>) => {
    event.stopPropagation();

    if (confirm(`Are you sure you would like to delete ${name}?`)) {
      deleteTransducer(id);
    }
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };


  const handleCloseDetails = () => {
    modalRef.current.close();
  };

  let content: JSX.Element = (
    <>
      <Search searchValue={searchValue} onChangeSearch={handleChangeSearch} />
      {filteredTransducers.length <= 0 && <h2 className={styles.empty}>No Results</h2>}
      <ul className={styles.container}>
        {filteredTransducers.map((transducer: Transducer) => (
          <TransducerItem
            key={transducer.id}
            transducerData={transducer}
            onClickTransducer={() => handleClickedTransducer(transducer)}
            onClickDelete={(event) =>
              handleDeleteTransducer(transducer.id, transducer.name, event)
            }
          />
        ))}
      </ul>
    </>
  );

  if (transducers.length === 0) {
    content = <EmptyScreen />
  }

  return (
    <>
      <Modal ref={modalRef}>
        {selectedTransducer && (
          <FullDetails
            transducer={selectedTransducer}
            onCloseModal={handleCloseDetails}
          />
        )}
      </Modal>
      {content}
    </>
  );
};

export default Transducers;
