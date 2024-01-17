import { useContext, useReducer } from 'react';

import { TransducerContext, TransducerContextType } from '../../store/transducer-context';
import { createTransducer, initialState, reducer } from '../../utils/formUtils';
import { isValidDate } from '../../utils/validation';
import TransducerForm from '../TransducerForm/TransducerForm';

type NewTransducerProps = {
  onCloseModal: () => void;
};

const NewTransducer = ({ onCloseModal }: NewTransducerProps) => {
  const { addTransducer } = useContext<TransducerContextType>(TransducerContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const validDate = isValidDate(state.received);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <TransducerForm
      isNew={true}
      formState={state}
      dispatchAction={dispatch}
      validDate={validDate}
      onSubmitForm={handleSubmit}
      onCancelForm={handleCancel}
    />
  );
};

export default NewTransducer;
