export const generateId = () => {
  return Date.now() + Math.floor(Math.random() * (100 - 1 + 1) + 1);
};

export const getTokenExpiration = () => {
  const date = new Date();
  return new Date(date.getTime() + 30 * 60000);
};
