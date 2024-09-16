import { Box, Typography, useTheme } from '@mui/material';

const NotFound = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h1">
        4
        <Typography
          component="span"
          variant="h1"
          sx={{
            textShadow: `2px 2px 0 ${theme.palette.warning.main}, -2px -2px 0 ${theme.palette.warning.main}, 0 0 8px ${theme.palette.primary.main}`,
          }}
        >
          0
        </Typography>
        4
      </Typography>
    </Box>
  );
};

export default NotFound;
