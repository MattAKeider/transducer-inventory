import {
  Condition,
  Department,
  Location,
  Transducer,
  TransducerType,
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
  received: string;
  condition: string;
  notes: string;
  service: boolean;
}

export const createTransducerObject = (formData: FormState): Transducer => {
  const newTransducer: Transducer = {
    id: crypto.randomUUID(),
    name: formData.name,
    location: formData.location as Location,
    department: formData.department as Department,
    room: formData.room,
    transducerType: formData.type as TransducerType,
    serialNumber: formData.serial,
    internalIdentifier: formData.internal,
    controlNumber: formData.control,
    dateReceived: new Date(formData.received),
    notes: formData.notes,
    outOfService: formData.service,
    currentCondition: [
      {
        conditionId: crypto.randomUUID(),
        condition: formData.condition as Condition,
        conditionChangedDate: new Date(),
        note: formData.notes,
      },
    ],
  };

  return newTransducer;
};
