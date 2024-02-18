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
    case 'CHANGE_INPUT': {
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
    }
    case 'CHANGE_CHECKBOX': {
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
    }
    case 'RESET': {
      return action.payload.initialState;
    }
    default: {
      return state;
    }
  }
};

// Edit a transducer with updated values
export const updateTransducer = (formData: FormState, originalTransducer: Transducer): Transducer => {
  const updatedTransducer: Transducer = {
    id: originalTransducer.id,
    name: formData.name,
    location: formData.location as Location,
    department: formData.department as Department,
    room: formData.room,
    transducerType: formData.type as TransducerType,
    serialNumber: formData.serial,
    internalIdentifier: formData.internal,
    controlNumber: formData.control,
    dateReceived: originalTransducer.dateReceived,
    outOfService: formData.service,
    currentCondition: [
      {
        id: crypto.randomUUID(), 
        condition: formData.condition as Condition,
        conditionChangedDate: '',
        note: formData.notes,
      }, 
      ...originalTransducer.currentCondition
    ]
  };

  return updatedTransducer;
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
