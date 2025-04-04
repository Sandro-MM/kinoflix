export const ParseCustomTimestamp = (timestamp: number | string) => {
  const date = new Date(+timestamp * 1000);

  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};
