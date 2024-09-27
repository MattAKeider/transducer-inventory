import { useState, useRef, useContext, useEffect } from 'react';

import { TransducerContext, TransducerContextType } from '../../context/TransducerContext';
import { UserContext, UserContextType } from '../../context/UserContext';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';
import Modal, { ModalHandle } from '../../ui/Modal/Modal';
import { filterBySearch } from '../../utils/utils';
import { Transducer } from '../../data/data';
import TransducerItem from '../TransducerItem/TransducerItem';
import FullDetails from '../FullDetails/FullDetails';
import Search from '../Search/Search';
import MessagePage from '../../ui/MessagePage/MessagePage';
import useHttp from '../../hooks/useHttp';
import styles from './Transducers.module.css';

const Transducers = () => {
  const { transducers, deleteTransducer } = useContext<TransducerContextType>(TransducerContext);
  const { token } = useContext<UserContextType>(UserContext);
  const { isLoading, error, sendRequest } = useHttp();
  const modalRef = useRef<ModalHandle>();

  const [selectedTransducer, setSelectedTransducer] = useState<Transducer | undefined>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredTransducers, setFilteredTransducers] = useState<Transducer[]>([]);

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

  const handleDeleteTransducer = async (
    id: string,
    name: string,
    event: React.MouseEvent<SVGAElement>
  ) => {
    event.stopPropagation();

    if (confirm(`Are you sure you would like to delete ${name}?`)) {
      const responseData = await sendRequest(
        `${import.meta.env.VITE_API_URL}/transducers/${id}`,
        'DELETE',
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (responseData) {
        deleteTransducer(id);
      }
    }
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleCloseDetails = () => {
    modalRef.current.close();
  };

  const content: JSX.Element = (
    <>
      <Search searchValue={searchValue} onChangeSearch={handleChangeSearch} />
      {filteredTransducers.length === 0 && <MessagePage message="No Results" />}
      <ul className={styles.transducers}>
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
      <LoadingSpinner loading={isLoading} />
      {!isLoading && error && (
        <MessagePage message={`${error.message} please reload page!`} isError />
      )}
      {!isLoading && !error && content}
    </>
  );
};

export default Transducers;
