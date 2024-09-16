import PieChart from '@/components/chart/PieChart';
import { ChartDataItem } from '@/components/chart/type';
import CardBox from '@/layout/CardBox';
import { Divider, Grid } from '@mui/material';
import { FC } from 'react';

interface LicenseAgentsProps {
  data: ChartDataItem[];
  isLoading: boolean;
}

const LicenseAgents: FC<LicenseAgentsProps> = ({ data, isLoading }) => {
  return (
    <Grid item md={4} xs={12}>
      <CardBox minHeight={'270px'}>
        <Divider sx={{ fontSize: '17px' }}>نمایش لایسنس عامل ها</Divider>
        <PieChart
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
