import PieChart from '@/components/chart/PieChart';
import { ChartDataItem } from '@/components/chart/type';
import CardBox from '@/layout/CardBox';
import { Divider, Grid } from '@mui/material';
import { FC } from 'react';

interface ResourceStatusProps {
  data: {
    analysis: ChartDataItem[];
  };
  isLoading: boolean;
}

const OpratingSystemClient: FC<ResourceStatusProps> = ({ data, isLoading }) => {
  return (
    <>
      <Grid item md={4} xs={12}>
        <CardBox minHeight={'270px'}>
          <Divider sx={{ fontSize: '17px' }}>سرویس گیرنده‌های سیستم عامل</Divider>
          <PieChart data={data?.analysis} isLoading={isLoading} />
        </CardBox>
      </Grid>
    </>
  );
};

export default OpratingSystemClient;
