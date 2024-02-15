import { Transducer } from "../data/data";

export const formatDate = (date: string): string => {
  const shortDate = new Date(date.split('T', 1).toString());

  const formattedDate = shortDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  });

  return formattedDate;
};

export const filterBySearch = (searchValue: string, transducers: Transducer[]): Transducer[] => {
  return transducers.filter((transducer: Transducer) => {
    const { name, serialNumber, controlNumber, location, transducerType } = transducer;

    if (
      name.toLowerCase().includes(searchValue.trim().toLowerCase()) || 
      serialNumber.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
      controlNumber.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
      location.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
      transducerType.toLowerCase().includes(searchValue.trim().toLowerCase())
    ) {
      return transducer;
    }
  });
};