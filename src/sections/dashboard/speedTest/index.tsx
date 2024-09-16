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
    <>
      <Grid item md={4} xs={12}>
        <CardBox>
          <Typography variant="h5"> </Typography>
          <GaugeChart data={data?.download} name={' دانلود سرور'} isLoading={isLoading} />
        </CardBox>
      </Grid>
      <Grid item md={4} xs={12}>
        <CardBox>
          <Typography variant="h5"> </Typography>
          <GaugeChart data={data?.upload} name=" آپلود سرور" isLoading={isLoading} />
        </CardBox>
      </Grid>
      <Grid item md={4} xs={12}>
        <CardBox>
          <Typography variant="h5"> </Typography>
          <GaugeChart data={data?.ping} name={'پینگ'} isLoading={isLoading} />
        </CardBox>
      </Grid>
    </>
  );
};

export default SpeedTest;
