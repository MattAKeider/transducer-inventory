import { FormState } from './formUtils';

export const isValidDate = (date: string): boolean => {
  const current = new Date();
  const dateAdded = new Date(date);

  return dateAdded <= current || date === '';
};

export const emptyValuesOnDisabled = (formValues: FormState): string[] => {
  return Object.values(formValues).filter((val: string) => val === '');
};
