import { Transducer, FormState, Condition } from "../models/model";

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

export const setExpirationDate = (hoursTillExpiration: number) => {
  let hours: number;

  if (hoursTillExpiration > 24 || hoursTillExpiration < 1) {
    hours = 1;
  } else {
    hours = hoursTillExpiration;
  }

  return new Date(new Date().getTime() + 1000 * 60 * 60 * hours);
};

// Extract already created transducer's data to populate edit form
export const transducerFormValues = (transducer: Transducer, condition: Condition): FormState => {
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
