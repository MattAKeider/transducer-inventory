import { useReducer } from 'react';

import { initialState, reducer } from '../../utils/formUtils';
import TransducerForm from '../TransducerForm/TransducerForm';

type NewTransducerProps = {
  onCloseModal: () => void;
};

const NewTransducer = ({ onCloseModal }: NewTransducerProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, validDate: boolean) => {
    event.preventDefault();

    if (!validDate) {
      return;
    }

    try {
      // create new transducer
      const createTransducerResponse = await fetch('http://localhost:5000/api/transducers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: state.name,
          location: state.location,
          department: state.department,
          room: state.room,
          transducerType: state.type,
          serialNumber: state.serial,
          internalIdentifier: state.internal,
          controlNumber: state.control,
          dateReceived: state.received,
          outOfService: state.service
        })
      });

      const transducerResponseData = await createTransducerResponse.json();

      if (!createTransducerResponse.ok) {
        throw new Error(transducerResponseData.message || 'Something went wrong...');
      }

      // Add new condition log entry for created transducer
      const createConditionResponse = await fetch('http://localhost:5000/api/conditions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          condition: state.condition,
          notes: state.notes,
          transducer: transducerResponseData.transducer._id
        })
      });

      const conditionResponseData = await createConditionResponse.json();

      if (!createConditionResponse.ok) {
        throw new Error(conditionResponseData.message || 'Something went wrong...');
      }
    } catch (error) {
      console.log(error);
    }

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
