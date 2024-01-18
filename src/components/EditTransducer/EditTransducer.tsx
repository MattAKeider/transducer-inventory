import { useContext, useEffect, useReducer } from 'react';

import { transducerFormValues, reducer, updateTransducer } from '../../utils/formUtils';
import { TransducerContext, TransducerContextType } from '../../store/transducer-context';
import { Transducer } from '../../data/data';
import TransducerForm from '../TransducerForm/TransducerForm';

type EditTransducerProps = {
  transducer: Transducer;
  onCloseModal: () => void;
};

const EditTransducer = ({ transducer, onCloseModal }: EditTransducerProps) => {
  const previousState = transducerFormValues(transducer);

  const { editTransducer } = useContext<TransducerContextType>(TransducerContext);
  const [state, dispatch] = useReducer(reducer, previousState);

  useEffect(() => {
    dispatch({
      type: 'RESET',
      payload: {
        initialState: previousState
      }
    });
  }, [transducer]);

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Update already created transducer 
    const updatedTransducer: Transducer = updateTransducer(state, transducer);

    // Edit this transducer 
    editTransducer(updatedTransducer);
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

  return <TransducerForm isNew={false} formState={state} dispatchAction={dispatch} onSubmitForm={handleEdit} onCancelForm={handleCancel} onEscForm={handleEsc} />
};

export default EditTransducer;