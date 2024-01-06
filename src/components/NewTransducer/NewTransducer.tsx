import TransducerForm from "../TransducerForm/TransducerForm";

type NewTransducerProps = {
  closeModal: () => void;
};

const NewTransducer = ({closeModal}: NewTransducerProps) => {
  return <TransducerForm closeForm={closeModal} />;
};

export default NewTransducer;