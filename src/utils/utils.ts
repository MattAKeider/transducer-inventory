import { Transducer } from "../data/data";

export const formatDate = (date: Date): string => {
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  });

  return formattedDate;
};

export const filterBySearch = (searchValue: string, transducers: Transducer[]): Transducer[] => {
  return transducers.filter((transducers: Transducer) => {
    return transducers.location.toLowerCase().includes(searchValue.toLowerCase());
  });
};