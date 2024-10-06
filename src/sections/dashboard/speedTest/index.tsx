import GaugeChart from '@/components/chart/GaugeChart';
import CardBox from '@/layout/CardBox';
import { Grid, Typography } from '@mui/material';
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
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item lg={4} sm={6} xs={12}>
        <CardBox>
          <Typography variant="h5"> </Typography>
          <GaugeChart data={data?.download} name={' دانلود سرور'} isLoading={isLoading} />
        </CardBox>
      </Grid>
      <Grid item lg={4} sm={6} xs={12}>
        <CardBox>
          <Typography variant="h5"> </Typography>
          <GaugeChart data={data?.upload} name=" آپلود سرور" isLoading={isLoading} />
        </CardBox>
      </Grid>
      <Grid item lg={4} sm={6} xs={12}>
        <CardBox>
          <Typography variant="h5"> </Typography>
          <GaugeChart data={data?.ping} name={'پینگ'} isLoading={isLoading} />
        </CardBox>
      </Grid>
    </Grid>
  );
};

export default SpeedTest;
