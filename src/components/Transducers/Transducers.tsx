import { useState, useRef, useContext, useEffect } from 'react';

import { TransducerContext, TransducerContextType } from '../../store/transducer-context';
import Modal, { ModalHandle } from '../../ui/Modal/Modal';
import { filterBySearch } from '../../utils/utils';
import { Transducer } from '../../data/data';
import TransducerItem from '../TransducerItem/TransducerItem';
import FullDetails from '../FullDetails/FullDetails';
import EmptyScreen from '../EmptyScreen/EmptyScreen';
import Search from '../Search/Search';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';
import MessagePage from '../MessagePage/MessagePage';
import styles from './Transducers.module.css';

const Transducers = () => {
  const { transducers, fetchTransducers, deleteTransducer } = useContext<TransducerContextType>(TransducerContext);
  const [selectedTransducer, setSelectedTransducer] = useState<Transducer | undefined>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredTransducers, setFilteredTransducers] = useState<Transducer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const modalRef = useRef<ModalHandle>();

  useEffect(() => {
    async function getTransducers() {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/transducers');
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || 'Something went wrong...');
        }

        fetchTransducers(responseData.transducers);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        setIsError(true);
      }
    }

    getTransducers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = filterBySearch(searchValue, transducers);
      setFilteredTransducers(filtered);
    }, 200);

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
      {filteredTransducers.length === 0 && <MessagePage message='No Results' />}
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
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && <MessagePage message="Something went wrong..." />}
      {!isLoading && !isError && content}
    </>
  );
};

export default Transducers;
