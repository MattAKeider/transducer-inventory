import { Transducer } from "../../data/data";

type EditTransducerProps = {
  transducer: Transducer;
  onCloseModal: () => void;
};

const EditTransducer = ({ transducer, onCloseModal }: EditTransducerProps) => {
  return <h1>Time to edit!!!!</h1>
};

export default EditTransducer;