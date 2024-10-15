import { Box } from '@mui/material';
import React from 'react';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
interface CardChartsProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}
const CardCharts: React.FC<CardChartsProps> = ({ children, sx }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: '14px',
        padding: '12px',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default CardCharts;
