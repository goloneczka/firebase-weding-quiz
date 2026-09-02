export const formatTS = (val) => {
  if (!val) return "—";
  if (val._seconds !== undefined) return new Date(val._seconds * 1000).toLocaleString();
  if (typeof val === "number") return new Date(val).toLocaleString();
  if (val instanceof Date) return val.toLocaleString();
  try {
    return String(val);
  } catch {
    return "—";
  }
};

export const hexToRgb = (hex) => {
  const value = hex.replace("#", "");

  const bigint = parseInt(value, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
};
