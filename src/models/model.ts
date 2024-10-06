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