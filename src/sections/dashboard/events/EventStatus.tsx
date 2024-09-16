import PieChart from '@/components/chart/PieChart';
import { ChartDataItem } from '@/components/chart/type';
import CardBox from '@/layout/CardBox';
import { Divider, Grid } from '@mui/material';
import { FC } from 'react';

interface EventStatusProps {
  data: ChartDataItem[];
  isLoading: boolean;
}

const EventStatus: FC<EventStatusProps> = ({ data, isLoading }) => {
  return (
    <Grid item md={4} xs={12}>
      <CardBox minHeight={'270px'}>
        <Divider sx={{ fontSize: '17px' }}>نمایش وضعیت رویداد</Divider>
        <PieChart data={data} isLoading={isLoading} />
      </CardBox>
    </Grid>
  );
};

export default EventStatus;
