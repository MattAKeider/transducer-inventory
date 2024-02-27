import { useContext, useEffect, useReducer } from 'react';

import { TransducerContext, TransducerContextType } from '../../context/transducer-context';
import { transducerFormValues, reducer } from '../../utils/formUtils';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';
import TransducerForm from '../TransducerForm/TransducerForm';
import { Transducer } from '../../data/data';
import useHttp from '../../hooks/useHttp';
import { UserContext, UserContextType } from '../../context/user-context';

type EditTransducerProps = {
  transducer: Transducer;
  condition: string;
  onCloseModal: () => void;
};

const EditTransducer = ({ transducer, condition, onCloseModal }: EditTransducerProps) => {
  const previousState = transducerFormValues(transducer, condition);

  const { editTransducer } = useContext<TransducerContextType>(TransducerContext);
  const { token } = useContext<UserContextType>(UserContext);
  const [state, dispatch] = useReducer(reducer, previousState);
  const { isLoading, sendRequest } = useHttp();

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

    const id = transducer.id;
  
    try {
      // GET transducer that needs edited
      const transducerData = await sendRequest(
        `http://localhost:5000/api/transducers/${id}`,
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
        'http://localhost:5000/api/conditions',
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
      console.log(error);
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
      />
    </>
  );
};

export default EditTransducer;