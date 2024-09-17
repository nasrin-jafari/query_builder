import PictorialBar from '@/components/chart/PictorialBar';
import { ChartDataItem } from '@/components/chart/type';
import PageBox from '@/components/common/PageBox';
import UseApi from '@/hooks/UseApi';
import CardBox from '@/layout/CardBox';
import NumberBox from '@/sections/reviewAndExplore/NumberBox';
import ReviewItems from '@/sections/reviewAndExplore/ReviewItems';
import { Box, Grid, Typography, useTheme } from '@mui/material';

interface Overview {
  logs_last_7_days: number;
  logs_last_month: number;
  alerts_last_7_days: number;
  alerts_last_month: number;
}

interface ChartData {
  date: number;
  value: number;
}

interface ApiResponse {
  logs: ChartDataItem[];
  alerts: ChartDataItem[];
  overview: Overview;
  events_chart: ChartData[];
  quarantined_chart: ChartData[];
}

const ReviewAndExplore: React.FC = () => {
  const theme = useTheme();

  const { data } = UseApi<ApiResponse>('/dashboard/review_overview/');
  const { data: topAgentData } = UseApi<ChartDataItem[]>('/ranking/agents_all_logs/5/');

  return (
    <PageBox title="نمای کلی و بررسی" description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا">
      <Box sx={{ mb: 2.5, mt: 4 }}>{data && <NumberBox data={data.overview} />}</Box>
      <Box sx={{ mb: 2.5 }}>
        {data && topAgentData && <ReviewItems data={data} topAgent={topAgentData} />}
      </Box>
      <Grid container spacing={4}>
        <Grid item md={6}>
          <CardBox>
            <Typography variant="h5">نمودار رخدادها</Typography>
            {data && (
              <PictorialBar
                data={data.events_chart}
                colors={[theme.palette.info.main, theme.palette.info.main]}
              />
            )}
          </CardBox>
        </Grid>
        <Grid item md={6}>
          <CardBox>
            <Typography variant="h5">نمودار قرنطینه‌شده‌ها</Typography>
            {data && (
              <PictorialBar
                data={data.quarantined_chart}
                colors={[theme.palette.error.main, theme.palette.error.main]}
              />
            )}
          </CardBox>
        </Grid>
      </Grid>
    </PageBox>
  );
};

export default ReviewAndExplore;
