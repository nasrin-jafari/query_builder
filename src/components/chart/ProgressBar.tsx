import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { FC } from 'react';
// import NoData from '../noData';

interface ProgressBarProps {
  total: number;
  usage: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ usage, total }) => {
  const theme = useTheme();
  //   const isLight = theme.palette.mode === 'light';
  // Calculate the usage percentage
  const percentage = (usage / total) * 100;

  // Determine the bar color based on the percentage
  const getBarColor = (percentage: number) => {
    if (percentage <= 25) {
      // greenColor
      return theme.palette.success.main;
    } else if (percentage <= 50) {
      // yellowColor
      return theme.palette.warning.main;
    } else if (percentage <= 75) {
      // orangeColor
      return theme.palette.primary.main;
    } else {
      // redColor
      return theme.palette.error.main;
    }
  };

  const barColor = getBarColor(percentage);

  // Styled component for the progress bar
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 30,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: barColor,
      transformOrigin: 'left !important',
    },
  }));
  //   const availableData = !usage || !total;
  //   if (availableData) {
  //     return <NoData type="progress" />;
  //   }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1.5 }}>
      <Typography variant="body2" color="text.secondary">
        {usage}G
      </Typography>
      <Box sx={{ flexGrow: 1, marginX: 1 }}>
        <BorderLinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            direction: 'ltr',
            '& .MuiLinearProgress-bar': {
              transformOrigin: 'left !important',
            },
          }}
        />
      </Box>
      <Typography variant="body2" color="text.secondary">
        {total}G
      </Typography>
    </Box>
  );
};

export default ProgressBar;
