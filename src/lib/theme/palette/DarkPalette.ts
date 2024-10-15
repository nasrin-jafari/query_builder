import { PaletteOptions } from '@mui/material';
interface ExtendedPaletteOptions extends PaletteOptions {
  grey: PaletteOptions['grey'] & {
    1000?: string;
    1100?: string;
    1200?: string;
    1300?: string;
  };
  background: PaletteOptions['background'] & {
    card: '#1A242E';
  };
}
export const darkPalette: ExtendedPaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#e57b2d',
  },
  secondary: {
    light: '#06465D',
    main: '#06465D',
  },
  info: {
    light: '#14c8d4',
    main: '#0093EF',
    dark: '#514fa6',
  },
  success: {
    light: 'rgba(55, 211, 171, 0.20)',
    main: '#1BBC98',
    dark: '#43eec6',
  },
  warning: {
    light: '#ffc43d',
    main: '#F8A71E',
    dark: '#f58634',
  },
  error: {
    light: 'rgba(235, 87, 87, 0.32)',
    main: '#EB5757',
  },

  grey: {
    50: '#09151F',
    100: '#1A242E',
    200: '#9BB5BE',
    300: '#F4F4FA',
    400: '#51515382',
    500: '#09151F',
    600: '#000',
    700: '#9BB5BE',
    800: '#F6F8F9',
    900: '#F4F4FA',
    1000: '#E1E9EB',
    1100: '#EEEEEE',
    1200: '#E9E9EA',
    1300: '#ffff',
  },
  common: {
    white: '#fff',
  },
  background: {
    default: '#09151F',
    card: '#1A242E',
  },
};
