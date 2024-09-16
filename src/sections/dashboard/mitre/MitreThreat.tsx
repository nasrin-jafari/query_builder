import BarChartHorizontal from '@/components/chart/BarChartHorizontal';
import { ChartDataItem } from '@/components/chart/type';
import CardBox from '@/layout/CardBox';
import { Divider, Grid } from '@mui/material';
import { FC } from 'react';

interface MitreThreatProps {
  data: ChartDataItem[];
  isLoading: boolean;
}

const MitreThreat: FC<MitreThreatProps> = ({ data, isLoading }) => {
  return (
    <>
      <Grid item md={4} xs={12}>
        <CardBox>
          <Divider sx={{ fontSize: '17px' }}>بازیگران تهدید Mitre</Divider>
          <BarChartHorizontal data={data} isLoading={isLoading} />
        </CardBox>
      </Grid>
    </>
  );
};

export default MitreThreat;
