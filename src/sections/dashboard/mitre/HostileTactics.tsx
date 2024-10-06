import BarChartHorizontal from '@/components/chart/BarChartHorizontal';
import { ChartDataItem } from '@/components/chart/type';
import CardBox from '@/layout/CardBox';
import { Divider, Grid } from '@mui/material';
import { FC } from 'react';

interface HostileTacticsProps {
  data: ChartDataItem[];
  isLoading: boolean;
}

const HostileTactics: FC<HostileTacticsProps> = ({ data, isLoading }) => {
  return (
    <>
      <Grid item lg={4} sm={12} xs={12}>
        <CardBox>
          <Divider sx={{ fontSize: '17px' }}>تکنیک‌های خصمانه</Divider>
          <BarChartHorizontal data={data} isLoading={isLoading} />
        </CardBox>
      </Grid>
    </>
  );
};

export default HostileTactics;
