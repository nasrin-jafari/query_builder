import { FC } from 'react';
import HostileTactics from './HostileTactics';
import MitreTactics from './MitreTactics';
import MitreThreat from './MitreThreat';
import { ChartDataItem } from '@/components/chart/type';
import { Grid, Typography } from '@mui/material';
import CardBox from '@/layout/CardBox';

interface MitreProps {
  data: {
    techniques_status: ChartDataItem[];
  };
  isLoading: boolean;
}

const Mitre: FC<MitreProps> = ({ data, isLoading }) => {
  return (
    <CardBox sx={{ mt: 2 }}>
      <Typography variant="h4" fontWeight="bold">
        حملات MITRE
      </Typography>
      <Grid container spacing={3} sx={{ mt: 0.25 }}>
        <HostileTactics data={data?.techniques_status} isLoading={isLoading} />
        <MitreThreat data={data?.techniques_status} isLoading={isLoading} />
        <MitreTactics data={data?.techniques_status} isLoading={isLoading} />
      </Grid>
    </CardBox>
  );
};

export default Mitre;
