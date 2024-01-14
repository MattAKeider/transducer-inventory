export const isValidDate = (date: string): boolean => {
  const current = new Date();
  const dateAdded = new Date(date);

  return dateAdded <= current || date === '';
};