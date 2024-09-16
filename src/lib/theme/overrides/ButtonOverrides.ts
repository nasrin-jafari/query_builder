import { Theme } from '@mui/material';

const ButtonOverrides = {
  root: ({ theme }: { theme: Theme }) => ({
    '&': {
      borderRadius: theme.shape.borderRadius,
      textTransform: 'none',
      padding: '8px 16px',
      boxShadow: 'none',
      color: theme.palette.grey[500],
    },

    contained: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    outlined: {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    text: {
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
};

export default ButtonOverrides;
