export function dateToLocalOffsetISO8601(date: Date) {
  // Get timezone offset in hours:minutes format
  const offset = (-date.getTimezoneOffset() / 60).toString().padStart(2, '0') + ':00';
  const sign = date.getTimezoneOffset() > 0 ? '-' : '+';
  return date.toISOString().slice(0, 19) + sign + offset;
}
