import PictorialBar from '@/components/chart/PictorialBar';
import { ChartDataItem } from '@/components/chart/type';
import PageBox from '@/components/common/PageBox';
import UseApi from '@/hooks/UseApi';
import NumberBox from '@/sections/reviewAndExplore/NumberBox';
import ReviewItems from '@/sections/reviewAndExplore/ReviewItems';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { fieldsQueries } from '@/constants/tableHeaders';
import React from 'react';
import CardCharts from '@/components/common/CardCharts';

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
    <PageBox
      title="نمای کلی و بررسی"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={fieldsQueries}
    >
      <Box sx={{ mb: 2.5, mt: 4 }}>{data && <NumberBox data={data.overview} />}</Box>
      <Box sx={{ mb: 2.5 }}>
        {data && topAgentData && <ReviewItems data={data} topAgent={topAgentData} />}
      </Box>
      <Grid container spacing={4}>
        <Grid item md={6}>
          <CardCharts>
            <Typography variant="h5">نمودار رخدادها</Typography>
            {data && (
              <PictorialBar
                data={data.events_chart}
                colors={[theme.palette.info.main, theme.palette.info.main]}
              />
            )}
          </CardCharts>
        </Grid>
        <Grid item md={6}>
          <CardCharts>
            <Typography variant="h5">نمودار قرنطینه‌شده‌ها</Typography>
            {data && (
              <PictorialBar
                data={data.quarantined_chart}
                colors={[theme.palette.error.main, theme.palette.error.main]}
              />
            )}
          </CardCharts>
        </Grid>
      </Grid>
    </PageBox>
  );
};

export default ReviewAndExplore;
