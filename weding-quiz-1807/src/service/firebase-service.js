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
