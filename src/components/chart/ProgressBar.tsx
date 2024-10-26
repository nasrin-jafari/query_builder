import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { FC } from 'react';

interface ProgressBarProps {
  total: number;
  usage: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ usage, total }) => {
  const theme = useTheme();
  const percentage = (usage / total) * 100;

  const getBarColor = (percentage: number) => {
    if (percentage <= 25) {
      return theme.palette.success.main;
    } else if (percentage <= 50) {
      return theme.palette.warning.light;
    } else if (percentage <= 75) {
      return theme.palette.primary.main;
    } else {
      return theme.palette.error.main;
    }
  };

  const barColor = getBarColor(percentage);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 30,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[400],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: barColor,
      transformOrigin: 'right !important',
    },
  }));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1.5 }}>
      <Typography variant="body2" color="text.secondary">
        {total}G
      </Typography>
      <Box sx={{ flexGrow: 1, marginX: 1 }}>
        <BorderLinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            direction: 'rtl',
            '& .MuiLinearProgress-bar': {
              transformOrigin: 'right !important',
            },
          }}
        />
      </Box>
      <Typography variant="body2" color="text.secondary">
        {usage}G
      </Typography>
    </Box>
  );
};

export default ProgressBar;
