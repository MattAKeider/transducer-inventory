export interface TransducerState {
  condition: 'Working' | 'Broken' | 'Refurbished (Closed)';
  stateChangedDate: Date;
  isRefurbished: boolean;
}

export interface Transducer {
  name: string;
  location: 'CMC' | 'MIDTOWN' | 'RISMAN' | 'CROCKER' | 'STREETSBORO' | 'BETTY THE BUS';
  department: 'MFM' | 'L&D' | 'TA' | 'TV' | 'IVF';
  room: string;
  serialNumber: string;
  internalIdentifier: string;
  controlNumber: string;
  dateReceived: Date;
  receivedState: string;
  currentState: TransducerState[];
}

export const TRANSDUCERS: Transducer[] = [
  {
    name: 'C1-5',
    location: 'MIDTOWN',
    department: 'MFM',
    room: '1',
    serialNumber: 'K1302KR5',
    internalIdentifier: '1',
    controlNumber: '00FB-12345',
    dateReceived: new Date('2023-01-22'),
    receivedState: 'New from GE',
    currentState: [
      {
        condition: 'Refurbished (Closed)',
        stateChangedDate: new Date('2023-11-17'),
        isRefurbished: true,
      },
      {
        condition: 'Broken',
        stateChangedDate: new Date('2023-04-02'),
        isRefurbished: false,
      },
      {
        condition: 'Working',
        stateChangedDate: new Date('2023-01-22'),
        isRefurbished: false,
      }
    ],
  },
  {
    name: 'D1-4',
    location: 'CMC',
    department: 'MFM',
    room: '2',
    serialNumber: 'F123300',
    internalIdentifier: '7',
    controlNumber: '00FB-12346',
    dateReceived: new Date('2023-03-22'),
    receivedState: 'New from GE',
    currentState: [
      {
        condition: 'Working',
        stateChangedDate: new Date('2023-03-22'),
        isRefurbished: false,
      },
    ],
  },
  {
    name: 'F23-45',
    location: 'MIDTOWN',
    department: 'IVF',
    room: 'IVF-A',
    serialNumber: 'K1377777',
    internalIdentifier: '21',
    controlNumber: '00SD-34444',
    dateReceived: new Date('2021-05-02'),
    receivedState: 'New from GE',
    currentState: [
      {
        condition: 'Broken',
        stateChangedDate: new Date('2023-10-17'),
        isRefurbished: false,
      },
    ],
  },
  {
    name: 'Z1-4',
    location: 'CROCKER',
    department: 'TV',
    room: '3',
    serialNumber: 'K1302KR0',
    internalIdentifier: '3',
    controlNumber: '00WB-12045',
    dateReceived: new Date('2023-01-22'),
    receivedState: 'New from GE',
    currentState: [
      {
        condition: 'Broken',
        stateChangedDate: new Date('2023-11-20'),
        isRefurbished: false,
      },
    ],
  },
  {
    name: 'C1-1',
    location: 'RISMAN',
    department: 'MFM',
    room: '4',
    serialNumber: 'K1302Z34',
    internalIdentifier: '14',
    controlNumber: '00FB-13221',
    dateReceived: new Date('2020-03-15'),
    receivedState: 'New from GE',
    currentState: [
      {
        condition: 'Working',
        stateChangedDate: new Date('2020-03-15'),
        isRefurbished: false,
      },
    ],
  },
];
