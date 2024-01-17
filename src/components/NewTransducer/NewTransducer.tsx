import { useContext, useReducer } from 'react';

import { TransducerContext, TransducerContextType } from '../../store/transducer-context';
import { createTransducer, initialState, reducer } from '../../utils/formUtils';
import TransducerForm from '../TransducerForm/TransducerForm';

type NewTransducerProps = {
  onCloseModal: () => void;
};

const NewTransducer = ({ onCloseModal }: NewTransducerProps) => {
  const { addTransducer } = useContext<TransducerContextType>(TransducerContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, validDate: boolean) => {
    event.preventDefault();

    if (!validDate) {
      return;
    }

    // Create new transducer object from form data
    const transducer = createTransducer(state);

    // Add transducer object to existing transducers array in context api
    addTransducer(transducer);

    // Reset form
    dispatch({
      type: 'RESET',
      payload: {
        initialState,
      },
    });

    onCloseModal();
  };

  const handleCancel = () => {
    dispatch({
      type: 'RESET',
      payload: {
        initialState,
      },
    });

    onCloseModal();
  };

  // Reset form on escape key
  const handleEsc = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      dispatch({
        type: 'RESET',
        payload: {
          initialState
        }
      });
    }
  };

  return (
    <TransducerForm
      isNew={true}
      formState={state}
      dispatchAction={dispatch}
      onSubmitForm={handleSubmit}
      onCancelForm={handleCancel}
      onEscForm={handleEsc}
    />
  );
};

export default NewTransducer;
