export type Condition = 'New' | 'Working' | 'Refurbished' | 'Loaner' | 'Broken (Out of Service)';
export type Location = 'CMC' | 'MIDTOWN' | 'RISMAN' | 'CROCKER' | 'STREETSBORO' | 'BETTY THE BUS';
export type Department = 'MFM' | 'L&D' | 'IVF';
export type TransducerType = 'TA' | 'TV';

export interface TransducerCondition {
  id: string;
  condition: Condition;
  conditionChangedDate: string;
  note: string;
}

export interface Transducer {
  id: string;
  name: string;
  location: Location;
  department: Department;
  transducerType: TransducerType;
  room: string;
  serialNumber: string;
  internalIdentifier: string;
  controlNumber: string;
  dateReceived: string;
  outOfService: boolean;
  currentCondition: TransducerCondition[];
}

export const TRANSDUCERS: Transducer[] = [
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
];
