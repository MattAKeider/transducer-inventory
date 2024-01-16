export type Condition = 'New' | 'Working' | 'Refurbished' | 'Loaner' | 'Broken (Out of Service)';
export type Location = 'CMC' | 'MIDTOWN' | 'RISMAN' | 'CROCKER' | 'STREETSBORO' | 'BETTY THE BUS';
export type Department = 'MFM' | 'L&D' | 'IVF';
export type TransducerType = 'TA' | 'TV';

export interface TransducerCondition {
  conditionId: string;
  condition: Condition;
  conditionChangedDate: Date;
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
  dateReceived: Date;
  notes: string;
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
    dateReceived: new Date('2023-01-22'),
    notes: '',
    outOfService: true,
    currentCondition: [
      {
        conditionId: crypto.randomUUID(),
        condition: 'Broken (Out of Service)',
        conditionChangedDate: new Date('2023-11-17'),
        note: 'Broke now',
      },
      {
        conditionId: crypto.randomUUID(),
        condition: 'Refurbished',
        conditionChangedDate: new Date('2023-04-02'),
        note: 'Refurbished item',
      },
      {
        conditionId: crypto.randomUUID(),
        condition: 'Working',
        conditionChangedDate: new Date('2023-01-22'),
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
    dateReceived: new Date('2023-03-22'),
    notes: '',
    outOfService: false,
    currentCondition: [
      {
        conditionId: crypto.randomUUID(),
        condition: 'Working',
        conditionChangedDate: new Date('2023-03-22'),
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
    dateReceived: new Date('2021-05-02'),
    notes: '',
    outOfService: true,
    currentCondition: [
      {
        conditionId: crypto.randomUUID(),
        condition: 'Broken (Out of Service)',
        conditionChangedDate: new Date('2023-10-17'),
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
    dateReceived: new Date('2023-01-22'),
    notes: '',
    outOfService: true,
    currentCondition: [
      {
        conditionId: crypto.randomUUID(),
        condition: 'Broken (Out of Service)',
        conditionChangedDate: new Date('2023-11-20'),
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
    dateReceived: new Date('2020-03-15'),
    notes: '',
    outOfService: false,
    currentCondition: [
      {
        conditionId: crypto.randomUUID(),
        condition: 'Working',
        conditionChangedDate: new Date('2020-03-15'),
        note: 'New from GE',
      },
    ],
  },
];
