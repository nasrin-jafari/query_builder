import { FC } from 'react';
import HostileTactics from './HostileTactics';
import MitreTactics from './MitreTactics';
import MitreThreat from './MitreThreat';
import { ChartDataItem } from '@/components/chart/type';
import { Grid } from '@mui/material';

interface MitreProps {
  data: {
    techniques_status: ChartDataItem[];
  };
  isLoading: boolean;
}

const Mitre: FC<MitreProps> = ({ data, isLoading }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <MitreThreat data={data?.techniques_status} isLoading={isLoading} />
      <MitreTactics data={data?.techniques_status} isLoading={isLoading} />
      <HostileTactics data={data?.techniques_status} isLoading={isLoading} />
    </Grid>
  );
};

export default Mitre;
