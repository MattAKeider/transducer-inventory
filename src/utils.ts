export const formatDate = (date: Date) => {
  let formattedDate = date.toLocaleString('default', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });

  return formattedDate;
};

export const generateKey = () => {
  return Math.random() * 1000;
};