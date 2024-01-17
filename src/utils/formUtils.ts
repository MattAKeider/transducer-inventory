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


type Type = 'CHANGE_INPUT' | 'CHANGE_CHECKBOX' | 'RESET';

export type Action = {
  type: Type,
  payload: {
    name?: string;
    value?: string;
    checked?: boolean;
    initialState?: FormState
  };
};

export const reducer = (state: FormState, action: Action): FormState => {
  switch(action.type) {
    case 'CHANGE_INPUT':
      if (action.payload.name === 'condition') {
        if (action.payload.value === 'Broken (Out of Service)') {
          return {
            ...state,
            [action.payload.name]: action.payload.value,
            ['service']: true
          };
        } else {
          return {
            ...state,
            [action.payload.name]: action.payload.value,
            ['service']: false
          };
        }
      }

      return {
        ...state,
        [action.payload.name]: action.payload.value
      };

    case 'CHANGE_CHECKBOX':
      if (action.payload.checked) {
        return {
          ...state,
          [action.payload.name]: action.payload.checked,
          ['condition']: 'Broken (Out of Service)'
        };
      }

      return {
        ...state,
        [action.payload.name]: action.payload.checked,
        ['condition']: 'Working'
      };

    case 'RESET':
      return action.payload.initialState;

    default: 
      return state;
  };
};

// Create a new transducer object from inputted form data
export const createTransducer = (formData: FormState): Transducer => {
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

export const transducerFormValues = (transducer: Transducer): FormState => {
  const newFormData: FormState = {
    name: transducer.name,
    location: transducer.location,
    department: transducer.department,
    room: transducer.room,
    type: transducer.transducerType,
    serial: transducer.serialNumber,
    internal: transducer.internalIdentifier,
    control: transducer.controlNumber,
    condition: transducer.currentCondition[0].condition,
    service: transducer.outOfService,
    notes: '',
  };

  return newFormData;
};
