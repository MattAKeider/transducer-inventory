import { useContext } from 'react';

import { TransducerContext, TransducerContextType } from '../../context/TransducerContext';
import TransducerForm from '../TransducerForm/TransducerForm';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';
import { UserContext, UserContextType } from '../../context/UserContext';
import { FormState } from '../../models/model';
import useHttp from '../../hooks/useHttp';
import useForm from '../../hooks/useForm';

export const initialState: FormState = {
  name: '',
  location: '',
  department: '',
  room: '',
  type: '',
  serial: '',
  internal: '',
  control: '',
  received: '',
  condition: '',
  notes: '',
  service: false
};

type NewTransducerProps = {
  onCloseModal: () => void;
};

const NewTransducer = ({ onCloseModal }: NewTransducerProps) => {
  const { addTransducer } = useContext<TransducerContextType>(TransducerContext);
  const { token } = useContext<UserContextType>(UserContext);
  const { isLoading, error, sendRequest } = useHttp();

  const { state, handleReset, handleEsc, handleChange, handleIsChecked } = useForm(initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, validDate: boolean) => {
    event.preventDefault();

    if (!validDate) {
      return;
    }

    const responseData = await sendRequest(
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

    if (responseData) {
      await sendRequest(
        `${import.meta.env.VITE_API_URL}/conditions`,
        'POST',
        JSON.stringify({
          condition: state.condition,
          note: state.notes,
          transducer: responseData.transducer.id,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      );
  
      addTransducer(responseData.transducer);
      handleReset();
      onCloseModal();
    }
  };

  const handleCancel = () => {
    handleReset();
    onCloseModal();
  };

  return (
    <>
      <LoadingSpinner loading={isLoading} />
      <TransducerForm
        isNew={true}
        formState={state}
        onSubmitForm={handleSubmit}
        onCancelForm={handleCancel}
        onEscForm={handleEsc}
        onChangeForm={handleChange}
        onIsChecked={handleIsChecked}
        error={error}
      />
    </>
  );
};

export default NewTransducer;
