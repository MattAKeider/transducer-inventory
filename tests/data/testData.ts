import { FormState, Transducer } from "../../src/models/model";

export const TRANSDUCERS: { transducers: Transducer[] } = {
  transducers: [
    {
      id: crypto.randomUUID(),
      name: 'C1-5',
      location: 'MIDTOWN',
      department: 'MFM',
      transducerType: 'TA',
      room: '1',
      serialNumber: 'K1302KR5',
      internalIdentifier: '1',
      controlNumber: '00FB-12345',
      dateReceived: "2024-02-15T03:50:45.695Z",
      outOfService: true,
      currentCondition: [
        {
          id: crypto.randomUUID(),
          condition: 'Broken (Out of Service)',
          conditionChangedDate: "2024-02-15T03:50:45.695Z",
          note: 'Broke now',
        },
        {
          id: crypto.randomUUID(),
          condition: 'Refurbished',
          conditionChangedDate: "2024-02-15T03:50:45.695Z",
          note: 'Refurbished item',
        },
        {
          id: crypto.randomUUID(),
          condition: 'Working',
          conditionChangedDate: "2024-02-15T03:50:45.695Z",
          note: 'New from GE',
        }
      ],
    },
    {
      id: crypto.randomUUID(),
      name: 'D1-4',
      location: 'CMC',
      department: 'MFM',
      transducerType: 'TV',
      room: '2',
      serialNumber: 'F123300',
      internalIdentifier: '7',
      controlNumber: '00FB-12346',
      dateReceived: "2024-02-15T03:50:45.695Z",
      outOfService: false,
      currentCondition: [
        {
          id: crypto.randomUUID(),
          condition: 'Working',
          conditionChangedDate: "2024-02-15T03:50:45.695Z",
          note: 'New from GE',
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      name: 'F23-45',
      location: 'MIDTOWN',
      department: 'IVF',
      transducerType: 'TA',
      room: 'IVF-A',
      serialNumber: 'K1377777',
      internalIdentifier: '21',
      controlNumber: '00SD-34444',
      dateReceived: "2024-02-15T03:50:45.695Z",
      outOfService: true,
      currentCondition: [
        {
          id: crypto.randomUUID(),
          condition: 'Broken (Out of Service)',
          conditionChangedDate: "2024-02-15T03:50:45.695Z",
          note: 'New from GE',
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      name: 'Z1-4',
      location: 'CROCKER',
      department: 'IVF',
      transducerType: 'TA',
      room: '3',
      serialNumber: 'K1302KR0',
      internalIdentifier: '3',
      controlNumber: '00WB-12045',
      dateReceived: "2024-02-15T03:50:45.695Z",
      outOfService: true,
      currentCondition: [
        {
          id: crypto.randomUUID(),
          condition: 'Broken (Out of Service)',
          conditionChangedDate: "2024-02-15T03:50:45.695Z",
          note: 'New from GE',
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      name: 'C1-1',
      location: 'RISMAN',
      department: 'MFM',
      transducerType: 'TV',
      room: '4',
      serialNumber: 'K1302Z34',
      internalIdentifier: '14',
      controlNumber: '00FB-13221',
      dateReceived: "2024-02-15T03:50:45.695Z",
      outOfService: false,
      currentCondition: [
        {
          id: crypto.randomUUID(),
          condition: 'Working',
          conditionChangedDate: "2024-02-15T03:50:45.695Z",
          note: 'New from GE',
        },
      ],
    },
  ]
};

export const USER = {
  userId: '67219fbe7ae3454dd9affe51',
  username: 'tester',
  email: 'tester@test.com',
  token: 'zzzzzzzzzzzzzzzzzzzzzzzzI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzIxOWZiZTdhZTM0NTRkZDlhZmZlNTEiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoidGVzdGVyQHRlc3QuY29tIiwiaWF0zzzzzzzzzzzzzz'
};

export const CONDITIONS = {
  conditions: [
    {
      id: crypto.randomUUID(),
      condition: 'Broken (Out of Service)',
      conditionChangedDate: "2024-02-15T03:50:45.695Z",
      note: 'Broke now',
    },
    {
      id: crypto.randomUUID(),
      condition: 'Refurbished',
      conditionChangedDate: "2024-02-15T03:50:45.695Z",
      note: 'Refurbished item',
    },
    {
      id: crypto.randomUUID(),
      condition: 'Working',
      conditionChangedDate: "2024-02-15T03:50:45.695Z",
      note: 'New from GE',
    }
  ]
};

export const INITIAL_FORM_STATE: FormState = {
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