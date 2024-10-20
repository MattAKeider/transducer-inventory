import { 
  filterBySearch, 
  formatDate, 
  setExpirationDate, 
  transducerFormValues 
} from '../../src/utils/utils';
import { TRANSDUCERS } from '../data/testData';
import { Transducer } from '../../src/models/model';

describe('Utils', () => {
  test('should format recieved input correctly', () => {
    const formattedDate = formatDate('2024-02-15T03:50:45.695Z');
    expect(formattedDate).toEqual('Feb 15, 2024');
  });

  test('should filter search correctly', () => {
    const results = filterBySearch('midtown', TRANSDUCERS);
    expect(results.length).toEqual(2);
  });

  test('should not return any results', () => {
    const results = filterBySearch('y', TRANSDUCERS);
    expect(results.length).toEqual(0);
  });

  test('should set expiration date to 3 hours from current date', () => {
    vi.setSystemTime('2024-09-08T01:13:34.000Z');
    expect(setExpirationDate(3).getTime() - new Date().getTime()).toBe(10800000);
  });

  test('should expire in 1 hour if hoursTillExpiration is greater than 24 hours', () => {
    vi.setSystemTime('2024-09-08T01:13:34.000Z');
    expect(setExpirationDate(32).getTime()).toBe(new Date().getTime() + 3600000);
  });

  test('should expire in 1 hour if hoursTillExpiration is a negative number', () => {
    vi.setSystemTime('2024-09-08T01:13:34.000Z');
    expect(setExpirationDate(-2).getTime()).toBe(new Date().getTime() + 3600000);
  });

  test('should create a new form data object', () => {
    expect(transducerFormValues(TRANSDUCER, 'Working')).toEqual({
      condition: "Working",
      control: "00FB-12346",
      department: "MFM",
      internal: "7",
      location: "CMC",
      name: "D1-4",
      notes: "",
      room: "2",
      serial: "F123300",
      service: false,
      type: "TV"
    });
  });
});

const TRANSDUCER: Transducer = {
  id: '1111',
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
  currentCondition: []
};
