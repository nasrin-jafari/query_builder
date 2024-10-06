import PieChart from '@/components/chart/PieChart';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface PiChartEntry {
  total: number;
}

interface PiChartCategory {
  [key: string]: PiChartEntry;
}

interface PiChart {
  [category: string]: PiChartCategory;
}

interface Event {
  en: string;
  value: number;
  fa: string;
  redirectTo: string;
}

interface ChartData {
  date: number;
  value: number;
}

interface DataStructure {
  pi_chart: PiChart;
  events: Event[];
  events_chart: ChartData[];
  quarantined_chart: ChartData[];
}

interface LogsProps {
  data: DataStructure;
}

const Logs: FC<LogsProps> = ({ data }) => {
  const router = useRouter();

  const eventDataChart =
    data.events?.length > 0
      ? data.events.map((item) => ({
          ...item,
          redirectTo: `/hosts/hostManagement/analysis`,
          query: { ...router.query, eventType: item.en, eventTypeFa: item.fa },
        }))
      : [];

  return (
    <Box>
      <PieChart data={eventDataChart} />
      aae aweawewe
    </Box>
  );
};

export default Logs;
