import { useContext, useEffect } from 'react';

import { TransducerContext, TransducerContextType } from '../../context/TransducerContext';
import { UserContext, UserContextType } from '../../context/UserContext';
import { transducerFormValues } from '../../utils/utils';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';
import TransducerForm from '../TransducerForm/TransducerForm';
import { Condition, Transducer } from '../../models/model';
import useHttp from '../../hooks/useHttp';
import useForm from '../../hooks/useForm';

type EditTransducerProps = {
  transducer: Transducer;
  condition: Condition;
  onCloseModal: () => void;
};

const EditTransducer = ({ transducer, condition, onCloseModal }: EditTransducerProps) => {
  const originalState = transducerFormValues(transducer, condition);

  const { editTransducer } = useContext<TransducerContextType>(TransducerContext);
  const { token } = useContext<UserContextType>(UserContext);
  const { state, handleReset, handleChange, handleIsChecked } = useForm(originalState);
  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    handleReset();
  }, [transducer, condition]);

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = transducer.id;

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
        outOfService: state.service,
      }),
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    );

    if (transducerData) {
      // Create a new conditon log item for transducer
      await sendRequest(
        `${import.meta.env.VITE_API_URL}/conditions`,
        'POST',
        JSON.stringify({
          condition: state.condition,
          note: state.notes,
          transducer: transducerData.transducer.id,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      );

      editTransducer(transducerData.transducer);
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
        isNew={false}
        formState={state}
        onSubmitForm={handleEdit}
        onCancelForm={handleCancel}
        onChangeForm={handleChange}
        onIsChecked={handleIsChecked}
        error={error}
      />
    </>
  );
};

export default EditTransducer;
