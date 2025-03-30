export const ParseCustomTimestamp = (timestamp: string) => {
  const year = timestamp.substring(0, 4);
  const month = timestamp.substring(4, 6);
  const day = timestamp.substring(6, 8);
  const hours = timestamp.substring(8, 10);
  const minutes = timestamp.substring(10, 12);
  const seconds = timestamp.substring(12, 14);
  const timezone = timestamp.substring(15);

  return `${hours}:${minutes}`;
};
