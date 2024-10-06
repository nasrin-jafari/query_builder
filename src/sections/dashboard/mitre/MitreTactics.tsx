import BarChart from '@/components/chart/BarChart';
import { ChartDataItem } from '@/components/chart/type';
import CardBox from '@/layout/CardBox';
import { Divider, Grid } from '@mui/material';
import { FC } from 'react';

interface MitreTacticsProps {
  data: ChartDataItem[];
  isLoading: boolean;
}

const MitreTactics: FC<MitreTacticsProps> = ({ data, isLoading }) => {
  return (
    <>
      <Grid item lg={4} sm={6} xs={12}>
        <CardBox>
          <Divider sx={{ fontSize: '17px' }}>تاکتیک های حمله</Divider>
          <BarChart data={data} isLoading={isLoading} />
        </CardBox>
      </Grid>
    </>
  );
};

export default MitreTactics;
