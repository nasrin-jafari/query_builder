import { PaletteOptions } from '@mui/material';
interface ExtendedPaletteOptions extends PaletteOptions {
  grey: PaletteOptions['grey'] & {
    1000?: string;
    1100?: string;
    1200?: string;
    1300?: string;
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
  },
  success: {
    light: 'rgba(55, 211, 171, 0.20)',
    main: '#1BBC98',
    dark: '#43eec6',
  },
  warning: {
    light: '#F8A71E',
    main: '#F8A71E',
  },
  error: {
    light: 'rgba(235, 87, 87, 0.32)',
    main: '#EB5757',
  },
  grey: {
    50: '#5A6B87',
    100: '#313A43',
    200: '#39393D',
    300: '#1A242E',
    400: '#161C24',
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
  },
};
