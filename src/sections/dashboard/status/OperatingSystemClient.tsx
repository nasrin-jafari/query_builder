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
    <Grid item sm={6} xs={12} lg={4}>
      <CardBox minHeight={'270px'}>
        <Divider sx={{ fontSize: '17px' }}>سرویس گیرنده‌های سیستم عامل</Divider>
        <PieChart data={analysis_data} isLoading={isLoading} />
      </CardBox>
    </Grid>
  );
};

export default OpratingSystemClient;
