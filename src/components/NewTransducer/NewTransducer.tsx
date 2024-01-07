import { Transducer } from "../../data/data";
import TransducerForm from "../TransducerForm/TransducerForm";

type NewTransducerProps = {
  onCloseModal: () => void;
  onNewTransducer: (transducer: Transducer) => void;
};

const NewTransducer = ({onCloseModal, onNewTransducer}: NewTransducerProps) => {
  return <TransducerForm onCloseForm={onCloseModal} onAddFormData={onNewTransducer} />;
};

export default NewTransducer;