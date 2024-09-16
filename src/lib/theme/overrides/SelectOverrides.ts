import { Theme, alpha } from '@mui/material';

const SelectOverrides = {
  root: ({ theme }: { theme: Theme }) => ({
    '&:hover': {
      '&& fieldset': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.dark, 0.25)}`,
      },
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: `${theme.shape.borderRadius}px`,
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.dark, 0.25)}`,
      },
    },
  }),
};

export default SelectOverrides;
