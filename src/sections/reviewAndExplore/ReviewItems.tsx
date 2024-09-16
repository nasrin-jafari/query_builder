import PieChart from '@/components/chart/PieChart';
import { ChartDataItem } from '@/components/chart/type';
import CardBox from '@/layout/CardBox';
import { Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

interface ItemsProps {
  data: ChartDataItem[];
  title: string;
}

interface ReviewItemsProps {
  data: {
    logs: ChartDataItem[];
    alerts: ChartDataItem[];
  };
  topAgent: ChartDataItem[];
}

const Items = ({ title, data }: ItemsProps) => {
  return (
    <Grid item md={12} lg={4}>
      <CardBox>
        <Box
          sx={{
            p: 3,
          }}
        >
          <Typography variant="h5">{title}</Typography>
          <PieChart data={data} />
        </Box>
      </CardBox>
    </Grid>
  );
};

const ReviewItems = ({ data, topAgent }: ReviewItemsProps) => {
  const router = useRouter();

  return (
    <Grid container spacing={4}>
      <Items
        title={'مقدار لاگ های ثبتی'}
        data={data?.logs?.map((log) => ({
          ...log,
          redirectTo: '/activity/events/inspect/',
          query: {
            ...router.query,
            event_type: log.en || '',
            agent_id: 'all_logs',
            title: 'لاگ های ' + log.fa,
          },
        }))}
      />
      <Items title={'هشدار های تولید شده'} data={data.alerts} />
      <Items
        title={'فعال ترین ایجنت ها'}
        data={topAgent?.map((item) => ({
          ...item,
          redirectTo: '/activity/events/inspect/',
          query: {
            ...router.query,
            event_type: 'all',
            agent_id: item.redirectTo ? item.redirectTo.replace(/^\/+/, '') : '',
            title: 'جزییات فعالیت های ' + item.en,
          },
        }))}
      />
    </Grid>
  );
};

export default ReviewItems;
