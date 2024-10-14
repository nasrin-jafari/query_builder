import PieChart from '@/components/chart/PieChart';
import { ChartDataItem } from '@/components/chart/type';
import CardBox from '@/layout/CardBox';
import { Grid, Theme, useMediaQuery } from '@mui/material';
import { FC } from 'react';

interface LicenseAgentsProps {
  data: ChartDataItem[];
  isLoading: boolean;
}

const LicenseAgents: FC<LicenseAgentsProps> = ({ data, isLoading }) => {
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <Grid item md={4} xs={12}>
      <CardBox title="نمایش لایسنس عامل ها">
        <PieChart
          renderBottomText={isMd}
          data={data?.map((item) => ({
            ...item,
            redirectTo: item.en == 'all' ? '/settings/licence' : '/hosts/hostManagement',
          }))}
          isLoading={isLoading}
        />
      </CardBox>
    </Grid>
  );
};

export default LicenseAgents;
