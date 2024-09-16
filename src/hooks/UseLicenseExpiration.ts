import { useState } from 'react';
import { differenceInDays, format, fromUnixTime, parse } from 'date-fns-jalali';

interface UseLicenseExpiration {
  showLicense: number | null;
  formatDate: string | null;
  convertDate: (expiration: number | null) => void;
}

export const useLicenseExpiration = (): UseLicenseExpiration => {
  const [showLicense, setShowLicense] = useState<number | null>(null);
  const [formatDate, setFormatDate] = useState<string | null>(null);

  const convertDate = (expiration: number | null): void => {
    if (expiration === undefined || expiration === null) {
      return;
    } else {
      const expirationTimestamp = expiration;
      const expirationDate = fromUnixTime(expirationTimestamp);
      const formattedDate = format(expirationDate, 'dd-MM-yyyy HH:mm');
      setFormatDate(formattedDate);

      const today = new Date();
      const expDate = parse(formattedDate, 'dd-MM-yyyy HH:mm', new Date());
      setShowLicense(differenceInDays(expDate, today));
    }
  };

  return { showLicense, convertDate, formatDate };
};
