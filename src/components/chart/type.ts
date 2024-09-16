export type ChartDataItem = {
  value?: number;
  name?: string;
  redirectTo?: string;
  en?: string; // Optional English name property
  fa?: string; // Optional Farsi name property
  status?: string;
  date?: number;
  timestamp?: number;
  timestamps?: number;
  add?: number;
  modified?: number;
  delete?: number;
  query?: { [key: string]: string };
};
