import { format, fromUnixTime } from 'date-fns-jalali';

export const ConvertDates = (timestamps: number, fullTime = false) => {
  const expirationDate = fromUnixTime(timestamps);

  const timeFormat = fullTime ? 'HH:mm' : '';

  return format(expirationDate, `${timeFormat} yyyy-MM-dd`);
};
