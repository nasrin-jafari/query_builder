import { FC } from 'react';
import HostileTactics from './HostileTactics';
import MitreTactics from './MitreTactics';
import MitreThreat from './MitreThreat';
import { ChartDataItem } from '@/components/chart/type';

interface MitreProps {
  data: {
    techniques_status: ChartDataItem[];
  };
  isLoading: boolean;
}

const Mitre: FC<MitreProps> = ({ data, isLoading }) => {
  return (
    <>
      <MitreThreat data={data?.techniques_status} isLoading={isLoading} />
      <MitreTactics data={data?.techniques_status} isLoading={isLoading} />
      <HostileTactics data={data?.techniques_status} isLoading={isLoading} />
    </>
  );
};

export default Mitre;
