export const formatDate = (date: Date) => {
  let formattedDate = date.toLocaleString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });

  return formattedDate;
};