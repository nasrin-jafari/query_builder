import { Theme, alpha } from '@mui/material/styles';

const TextFieldOverrides = {
  root: ({ theme }: { theme: Theme }) => ({
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'transparent', // Add your desired background color here
      borderRadius: theme.shape.borderRadius,

      '& .MuiInputBase-inputAdornedEnd': {
        borderRadius: `0`,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
      },
      '& .MuiOutlinedInput-input:-webkit-autofill': {
        boxShadow:
          theme.palette.mode === 'light'
            ? `0 0 0 100px ${theme.palette.grey[100]} inset`
            : `0 0 0 100px ${theme.palette.grey[100]} inset`,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
      },
    },
  }),
};

export default TextFieldOverrides;
