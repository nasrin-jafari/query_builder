import PieChart from '@/components/chart/PieChart';
import { ChartDataItem } from '@/components/chart/type';
import CardBox from '@/layout/CardBox';
import { Grid, Theme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface EventStatusProps {
  data: ChartDataItem[];
  isLoading: boolean;
}

const EventStatus: FC<EventStatusProps> = ({ data, isLoading }) => {
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const router = useRouter();
  const events_status_data = data?.map((item) => ({
    ...item,
    redirectTo: '/activity/events/inspect/',
    query: {
      ...router.query,
      event_type: item.en,
      agent_id: 'all_logs',
      title: 'لاگ های ' + item.fa,
    },
  }));
  return (
    <Grid item md={4} xs={12}>
      <CardBox title="نمایش وضعیت رویداد">
        <PieChart renderBottomText={isMd} data={events_status_data} isLoading={isLoading} />
      </CardBox>
    </Grid>
  );
};

export default EventStatus;
