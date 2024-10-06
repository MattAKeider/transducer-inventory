import {
  Transducer,
} from '../data/data';

export interface FormState {
  name: string;
  location: string;
  department: string;
  room: string;
  type: string;
  serial: string;
  internal: string;
  control: string;
  received?: string;
  condition: string;
  notes: string;
  service: boolean;
}

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

// Extract already created transducer's data to populate edit form
export const transducerFormValues = (transducer: Transducer, condition: string): FormState => {
  const newFormData: FormState = {
    name: transducer.name,
    location: transducer.location,
    department: transducer.department,
    room: transducer.room,
    type: transducer.transducerType,
    serial: transducer.serialNumber,
    internal: transducer.internalIdentifier,
    control: transducer.controlNumber,
    condition,
    service: transducer.outOfService,
    notes: '',
  };

  return newFormData;
};
