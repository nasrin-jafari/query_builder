import { ThemeOptions, TypographyVariantsOptions, createTheme } from '@mui/material/styles';
import SelectOverrides from './overrides/SelectOverrides';
import SwitchOverrides from './overrides/SwitchOverrides';
import TextFieldOverrides from './overrides/TextFieldOverrides';
import { darkPalette } from './palette/DarkPalette';
import { lightPalette } from './palette/LightPalette';
import ButtonOverrides from './overrides/ButtonOverrides';

const typography: TypographyVariantsOptions = {
  fontFamily: 'vazir',
  fontSize: 16,
};

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

const shape = {
  borderRadius: 8,
};

const commonThemeOptions: Omit<ThemeOptions, 'palette'> = {
  typography,
  breakpoints,
  shape,
  components: {
    MuiTextField: {
      styleOverrides: TextFieldOverrides,
    },
    MuiSwitch: {
      styleOverrides: SwitchOverrides,
    },
    MuiSelect: {
      styleOverrides: SelectOverrides,
    },
    MuiButton: {
      styleOverrides: ButtonOverrides,
    },
  },
};

export const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: lightPalette,
});

export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: darkPalette,
});
