import GaugeChart from '@/components/chart/GaugeChart';
import CardBox from '@/layout/CardBox';
import { Grid, Typography, useTheme } from '@mui/material';
import { FC } from 'react';

interface SpeedTestProps {
  data: {
    download: string;
    ping: string;
    upload: string;
  };
  isLoading: boolean;
}

const SpeedTest: FC<SpeedTestProps> = ({ data, isLoading }) => {
  const theme = useTheme();

  const renderGauge = (label: string, value: string, color: string) => (
    <Grid item lg={4} sm={6} xs={12}>
      <CardBox>
        <Grid container>
          <Grid item md={6}>
            <Typography variant="h6" fontWeight="bold">
              {label}
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {value ? `${value}mb` : ''}
            </Typography>
          </Grid>
          <Grid item sm={12} md={6}>
            <GaugeChart data={value} name={label} isLoading={isLoading} color={color} />
          </Grid>
        </Grid>
      </CardBox>
    </Grid>
  );

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {renderGauge('سرعت دانلود سرور', data?.download, theme.palette.info.dark)}
      {renderGauge('سرعت آپلود سرور', data?.upload, theme.palette.primary.main)}
      {renderGauge('پینگ سرور', data?.ping, theme.palette.success.dark)}
    </Grid>
  );
};

export default SpeedTest;
