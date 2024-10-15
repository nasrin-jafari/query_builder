import { PaletteOptions } from '@mui/material';

interface ExtendedPaletteOptions extends PaletteOptions {
  grey: PaletteOptions['grey'] & {
    1000?: string;
    1100?: string;
    1200?: string;
    1300?: string;
  };
  background: PaletteOptions['background'] & {
    card: '#fff';
  };
}

export const lightPalette: ExtendedPaletteOptions = {
  mode: 'light',
  primary: {
    light: 'rgba(245, 134, 52, 0.30)',
    main: '#F58634',
  },
  secondary: {
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
    light: 'rgba(248, 167, 30, 0.20)',
    main: '#F8A71E',
    dark: '#f58634',
  },
  error: {
    light: 'rgba(235, 87, 87, 0.30)',
    main: '#EB5757',
  },

  grey: {
    50: '#F6F8F9',
    100: '#fff',
    200: '#9BB5BE',
    300: '#39393D',
    400: '#51515382',
    500: '#5A6B87',
    600: '#ffff',
    700: '#5A6B87',
    800: '#313A43',
    900: '#39393D',
    1000: '#1A242E',
    1100: '#161C24',
    1200: '#09151F',
    1300: '#000',
  },
  common: {
    white: '#ffffff',
  },
  background: {
    default: '#F6F8F9',
    card: '#fff',
  },
};
