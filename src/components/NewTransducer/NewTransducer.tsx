import TransducerForm from "../TransducerForm/TransducerForm";

type NewTransducerProps = {
  onCloseModal: () => void;
};

const NewTransducer = ({onCloseModal}: NewTransducerProps) => {
  return <TransducerForm onCloseForm={onCloseModal} />;
};

export default NewTransducer;