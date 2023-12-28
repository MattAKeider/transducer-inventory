export interface Transducer {
  name: string;
  location: "CMC" | "MIDTOWN" | "RISMAN" | "CROCKER" | "STREETSBORO";
  department: "MFM" | "L&D" | "TA" | "TV" | "IVF";
  serialNumber: string;
  internalIdentifier: string;
  controlNumber: string;
  dateReceived: Date;
  receivedState: string;
  currentState: {
    state: "Working" | "Broken" | "Refurbished";
    stateChangedDate: Date;
    isRefurbished: boolean;
  }[];
}

export const TRANSDUCERS: Transducer[] = [
  {
    name: "C1-5",
    location: "MIDTOWN",
    department: "MFM",
    serialNumber: "K1302KR5",
    internalIdentifier: "1",
    controlNumber: "00FB-12345",
    dateReceived: new Date("2023-01-22"),
    receivedState: "New from GE",
    currentState: [
      {
        state: "Working",
        stateChangedDate: new Date("2023-01-22"),
        isRefurbished: false,
      },
    ],
  },
  {
    name: "D1-4",
    location: "CMC",
    department: "MFM",
    serialNumber: "F123300",
    internalIdentifier: "7",
    controlNumber: "00FB-12346",
    dateReceived: new Date("2023-03-22"),
    receivedState: "New from GE",
    currentState: [
      {
        state: "Working",
        stateChangedDate: new Date("2023-03-22"),
        isRefurbished: false,
      },
    ],
  },
  {
    name: "F23-45",
    location: "MIDTOWN",
    department: "IVF",
    serialNumber: "K1377777",
    internalIdentifier: "21",
    controlNumber: "00SD-34444",
    dateReceived: new Date("2021-05-02"),
    receivedState: "New from GE",
    currentState: [
      {
        state: "Broken",
        stateChangedDate: new Date("2023-10-17"),
        isRefurbished: false,
      },
    ],
  },
  {
    name: "Z1-4",
    location: "CROCKER",
    department: "TV",
    serialNumber: "K1302KR0",
    internalIdentifier: "3",
    controlNumber: "00WB-12045",
    dateReceived: new Date("2023-01-22"),
    receivedState: "New from GE",
    currentState: [
      {
        state: "Broken",
        stateChangedDate: new Date("2023-11-20"),
        isRefurbished: false,
      },
    ],
  },
  {
    name: "C1-1",
    location: "RISMAN",
    department: "MFM",
    serialNumber: "K1302Z34",
    internalIdentifier: "14",
    controlNumber: "00FB-13221",
    dateReceived: new Date("2020-03-15"),
    receivedState: "New from GE",
    currentState: [
      {
        state: "Working",
        stateChangedDate: new Date("2020-03-15"),
        isRefurbished: false,
      },
    ],
  },
];
