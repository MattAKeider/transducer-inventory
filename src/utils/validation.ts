export const isValidDate = (date: string) => {
  return new Date(date) > new Date();
};