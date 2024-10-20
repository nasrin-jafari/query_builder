import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FileProgressProps } from './types';

const FileProgress: React.FC<FileProgressProps> = ({ details }) => {
  const theme = useTheme();

  if (!details) {
    return <p>هیچ جزئیاتی برای نمایش وجود ندارد.</p>;
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginY: '16px',
          direction: 'rtl',
        }}
      >
        <Typography sx={{ color: theme.palette.success.main }}>Benign:</Typography>
        <Typography>{details.Benign ? (details.Benign * 100).toFixed(2) : 0}%</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={details.Benign ? details.Benign * 100 : 0}
        sx={{
          height: '20px',
          backgroundColor: theme.palette.grey[50],
          '& .MuiLinearProgress-bar': {
            backgroundColor: theme.palette.success.main,
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginY: '16px',
          direction: 'rtl',
        }}
      >
        <Typography sx={{ color: theme.palette.error.main }}>Malware:</Typography>
        <Typography>{details.Malware ? (details.Malware * 100).toFixed(2) : 0}%</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={details.Malware ? details.Malware * 100 : 0}
        sx={{
          height: '20px',
          backgroundColor: theme.palette.grey[50],
          '& .MuiLinearProgress-bar': {
            backgroundColor: theme.palette.error.main,
          },
        }}
      />
    </div>
  );
};

export default FileProgress;
