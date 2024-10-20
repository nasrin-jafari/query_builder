import BarChart from '@/components/chart/BarChart';
import BarChartHorizontal from '@/components/chart/BarChartHorizontal';
import PictorialBar from '@/components/chart/PictorialBar';
import PieChart from '@/components/chart/PieChart';
import PageBox from '@/components/common/PageBox';
import useApi from '@/hooks/UseApi';
import Logs from '@/sections/hosts/hostManagement/logs';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fieldsQueries } from '@/constants/tableHeaders';
import CardCharts from '@/components/common/CardCharts';

interface DataOfTotal {
  en: string;
  value: number;
}

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

const LogsAgent = () => {
  const router = useRouter();
  const { query } = router;
  const { data, loading } = useApi<DataStructure>(`/agents/${query.logId}/logs/`);
  const [newData, setNewData] = useState<DataOfTotal[]>([]);

  useEffect(() => {
    if (data?.pi_chart) {
      const dataOfPiChart = Object.entries(data.pi_chart).reduce<DataOfTotal[]>(
        (acc, [title, value]) => {
          if (
            !value ||
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === 'object' && Object.keys(value).length === 0)
          ) {
            return acc;
          }

          acc.push({
            en: title,
            value: Object.entries(value)
              ?.map(([_, value]) => value.total)
              .reduce((total, cur) => total + cur, 10),
          });

          return acc;
        },
        []
      );
      setNewData(dataOfPiChart);
    }
  }, [data]);

  const normalizedData: DataStructure = {
    pi_chart: data?.pi_chart || {},
    events: data?.events || [],
    events_chart: data?.events_chart || [],
    quarantined_chart: data?.quarantined_chart || [],
  };
  const eventDataChart =
    normalizedData.events?.length > 0
      ? normalizedData.events.map((item) => ({
          ...item,
          redirectTo: `/hosts/hostManagement/analysis`,
          query: { ...router.query, eventType: item.en, eventTypeFa: item.fa },
        }))
      : [];
  return (
    <PageBox title={`مدیریت رخدادهای ${query.name}`} searchQuery={fieldsQueries}>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item md={8} xs={12}>
          <CardCharts sx={{ minHeight: '250px' }}>
            <Typography variant="h5">نمودار رویدادها</Typography>
            <PictorialBar data={normalizedData.events_chart} />
          </CardCharts>
        </Grid>
        <Grid item md={4} xs={12}>
          <CardCharts sx={{ minHeight: '315px', height: '100%' }}>
            <Typography variant="h5" sx={{ mb: '40px' }}>
              نمودار رویدادها
            </Typography>
            <PieChart data={eventDataChart} />
          </CardCharts>
        </Grid>
        <Grid item md={8} xs={12}>
          <CardCharts sx={{ minHeight: '315px' }}>
            <BarChart data={normalizedData.quarantined_chart} isLoading={loading} />
          </CardCharts>
        </Grid>
        <Grid item md={4} xs={12}>
          <CardCharts sx={{ minHeight: '315px' }}>
            <BarChartHorizontal data={newData} isLoading={loading} />
          </CardCharts>
        </Grid>
        <Logs data={normalizedData} />
      </Grid>
    </PageBox>
  );
};

export default LogsAgent;
