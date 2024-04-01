import { useContext, useReducer, useState } from 'react';

import {
  TransducerContext,
  TransducerContextType,
} from '../../context/transducer-context';
import { initialState, reducer } from '../../utils/formUtils';
import TransducerForm from '../TransducerForm/TransducerForm';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';
import { UserContext, UserContextType } from '../../context/user-context';
import useHttp from '../../hooks/useHttp';

type NewTransducerProps = {
  onCloseModal: () => void;
};

const NewTransducer = ({ onCloseModal }: NewTransducerProps) => {
  const { addTransducer } =
    useContext<TransducerContextType>(TransducerContext);
  const { token } = useContext<UserContextType>(UserContext);
  const { isLoading, sendRequest } = useHttp();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    validDate: boolean
  ) => {
    event.preventDefault();

    setErrorMessage(null);

    if (!validDate) {
      return;
    }

    try {
      const transducerResponseData = await sendRequest(
        `${import.meta.env.VITE_API_URL}/transducers`,
        'POST',
        JSON.stringify({
          name: state.name,
          location: state.location,
          department: state.department,
          transducerType: state.type,
          room: state.room,
          serialNumber: state.serial,
          internalIdentifier: state.internal,
          controlNumber: state.control,
          dateReceived: state.received,
          outOfService: state.service,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      );

      await sendRequest(
        `${import.meta.env.VITE_API_URL}/conditions`,
        'POST',
        JSON.stringify({
          condition: state.condition,
          note: state.notes,
          transducer: transducerResponseData.transducer.id,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      );

      addTransducer(transducerResponseData.transducer);
    } catch (error) {
      setErrorMessage(error.message);
      return;
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
          initialState,
        },
      });
    }
  };

  return (
    <>
      {/* <LoadingSpinner loading={isLoading} style={{ marginTop: '35rem'}}/> */}
      <TransducerForm
        isNew={true}
        formState={state}
        dispatchAction={dispatch}
        onSubmitForm={handleSubmit}
        onCancelForm={handleCancel}
        onEscForm={handleEsc}
        error={errorMessage}
      />
    </>
  );
};

export default NewTransducer;
