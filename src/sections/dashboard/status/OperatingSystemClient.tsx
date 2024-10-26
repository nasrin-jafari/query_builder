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
    <Grid
      item
      sx={{
        width: {
          xs: '100%',
          lg: '50%',
          xl: '25%',
        },
        '@media (min-width: 1000px) and (max-width: 1300px)': { width: '50%' },
        '@media (min-width: 1700px)': {
          width: '25%',
        },
      }}
    >
      <CardBox title="سرویس گیرنده‌های سیستم عامل">
        <Box>
          <NightingaleChart data={analysis_data} isLoading={isLoading} />
        </Box>
      </CardBox>
    </Grid>
  );
};

export default OpratingSystemClient;
