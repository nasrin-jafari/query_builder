import NightingaleChart from '@/components/chart/NightingaleChart';
import { ChartDataItem } from '@/components/chart/type';
import CardBox from '@/layout/CardBox';
import { Box, Grid } from '@mui/material';
import { FC } from 'react';

interface ResourceStatusProps {
  data: {
    analysis: ChartDataItem[];
  };
  isLoading: boolean;
}

const OpratingSystemClient: FC<ResourceStatusProps> = ({ data, isLoading }) => {
  const redirctUrl: Record<string, string> = {
    MultiAV: '/intelligence/antivirusResults',
    AI: '/intelligence/aiResults',
    Sandbox: '/',
    Sutter: '/',
    Siem: '/',
  };

  const analysis_data = data?.analysis?.map((analysis) => {
    const redirectTo = analysis.en ? redirctUrl[analysis.en] : '/';
    return {
      ...analysis,
      redirectTo,
    };
  });
  return (
    <Grid item sm={6} xs={12} lg={3}>
      <CardBox title="سرویس گیرنده‌های سیستم عامل">
        <Box>
          <NightingaleChart
            data={analysis_data}
            isLoading={isLoading}
            colors={['#514fa6', '#ffc43d', '#f58634', '#ee6161', '#c8d6db']}
          />
        </Box>
      </CardBox>
    </Grid>
  );
};

export default OpratingSystemClient;
