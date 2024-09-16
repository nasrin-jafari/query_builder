import PieChart from '@/components/chart/PieChart';
import { ChartDataItem } from '@/components/chart/type';
import CardBox from '@/layout/CardBox';
import { Divider, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface AgentActivityProps {
  data: ChartDataItem[];
  isLoading: boolean;
}

const AgentActivity: FC<AgentActivityProps> = ({ data, isLoading }) => {
  const router = useRouter();
  return (
    <Grid item md={4} xs={12}>
      <CardBox minHeight={'270px'}>
        <Divider sx={{ fontSize: '17px' }}>وضعیت فعالیت عامل ها</Divider>
        <PieChart
          data={data?.map((item) => ({
            ...item,
            redirectTo: '/hosts/hostManagement/inspect',
            query: {
              ...router.query,
              status: item.redirectTo ? item.redirectTo.replace(/^\/+/, '') : '',
              statusFa: item.fa || '',
            },
          }))}
          isLoading={isLoading}
        />
      </CardBox>
    </Grid>
  );
};

export default AgentActivity;
