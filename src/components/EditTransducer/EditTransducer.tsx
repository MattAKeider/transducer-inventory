import { useContext, useEffect, useReducer, useState } from 'react';

import { TransducerContext, TransducerContextType } from '../../context/transducer-context';
import { UserContext, UserContextType } from '../../context/user-context';
import { transducerFormValues, reducer } from '../../utils/formUtils';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';
import TransducerForm from '../TransducerForm/TransducerForm';
import { Transducer } from '../../data/data';
import useHttp from '../../hooks/useHttp';

type EditTransducerProps = {
  transducer: Transducer;
  condition: string;
  onCloseModal: () => void;
};

const EditTransducer = ({ transducer, condition, onCloseModal }: EditTransducerProps) => {
  const previousState = transducerFormValues(transducer, condition);

  const { editTransducer } = useContext<TransducerContextType>(TransducerContext);
  const { token } = useContext<UserContextType>(UserContext);
  const { isLoading, sendRequest } = useHttp();

  const [state, dispatch] = useReducer(reducer, previousState);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  useEffect(() => {
    dispatch({
      type: 'RESET',
      payload: {
        initialState: previousState
      }
    });
  }, [transducer]);

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const id = transducer.id;
  
    try {
      // GET transducer that needs edited
      const transducerData = await sendRequest(
        `${import.meta.env.VITE_API_URL}/transducers/${id}`,
        'PATCH',
        JSON.stringify({
          name: state.name,
          location: state.location,
          department: state.department,
          transducerType: state.type,
          room: state.room,
          serialNumber: state.serial,
          internalIdentifier: state.internal,
          controlNumber: state.control,
          outOfService: state.service
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      );

      // Create a new conditon log item for transducer
      await sendRequest(
        `${import.meta.env.VITE_API_URL}/conditions`,
        'POST',
        JSON.stringify({
          condition: state.condition,
          note: state.notes,
          transducer: id
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      );

      editTransducer(transducerData.transducer);
    } catch (error) {
      setErrorMessage(error);
      return;
    }
  
    onCloseModal();
  };

  const handleCancel = () => {
    dispatch({
      type: 'RESET',
      payload: {
        initialState: previousState
      }
    });

    onCloseModal();
  };

  // Reset form on escape key
  const handleEsc = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      dispatch({
        type: 'RESET',
        payload: {
          initialState: previousState
        }
      });
    }
  };

  return (
    <>
      <LoadingSpinner loading={isLoading} style={{ marginTop: '35rem'}} />
      <TransducerForm 
        isNew={false} 
        formState={state} 
        dispatchAction={dispatch} 
        onSubmitForm={handleEdit} 
        onCancelForm={handleCancel} 
        onEscForm={handleEsc}
        error={errorMessage}
      />
    </>
  );
};

export default EditTransducer;