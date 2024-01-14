export const formatDate = (date: Date): string => {
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  });

  return formattedDate;
};