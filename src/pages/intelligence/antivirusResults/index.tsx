import { CustomDataGrid } from '@/components';
import PictorialBar from '@/components/chart/PictorialBar';
import PieChart from '@/components/chart/PieChart';
import PageBox from '@/components/common/PageBox';
import { fieldsQueries, multiav } from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';
import PanelComponent from '@/layout/PanelComponent';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';

interface AntivirusData {
  agent_id: string;
  agent_ip: string;
  file_name: string;
  scan_id: string;
  scan_time: string;
  upload_file_source: string;
}

interface Top5MultiavAgent {
  en: string;
  value: number;
  redirectTo: string;
}

interface ScanResult {
  en: string;
  fa: string;
  value: number;
  redirectTo: string;
}

interface MultiavTimeChart {
  date: number;
  value: number;
}

interface MultiavData {
  top_5_multiav_agents: Top5MultiavAgent[];
  scan_results: ScanResult[];
  multiav_time_chart: MultiavTimeChart[];
}

interface EventsResponse {
  Data?: AntivirusData[];
}

const AntivirusResults = () => {
  const { data: all_detected_Data, loading } = useApi<EventsResponse>(
    '/multiav/detected/?per_page=5'
  );
  const { data: events } = useApi<MultiavData>('/multiav/analysis/');
  const headersCol = multiav?.slice(0, 3);
  const theme = useTheme();
  const router = useRouter();

  const components = [
    {
      component: CustomDataGrid,
      props: {
        rows: all_detected_Data?.Data,
        columns: headersCol,
        linkOverview: '/intelligence/antivirusResults/overview',
        notExtra: true,
        loading,
      },
      gridProps: {
        xs: 12,
        xl: 6,
      },
      skeletonHeight: 400,
      withCard: false,
    },
    {
      component: PieChart,
      props: {
        data: events?.top_5_multiav_agents?.map((agent) => ({
          ...agent,
          redirectTo: '/intelligence/antivirusResults/inspect',
          query: { ...router.query, computer_name: agent.en },
        })),
        renderBottomText: true,
      },
      title: 'فعال ترین ها',
      gridProps: { xs: 6, xl: 3 },
      skeletonHeight: 400,
      withCard: true,
    },
    {
      component: PieChart,
      props: {
        data: events?.scan_results.map((item) => ({
          ...item,
          redirectTo: '/intelligence/antivirusResults/inspect',
          query: {
            ...router.query,
            contentType: item.en,
          },
        })),
        renderBottomText: true,
        colors: [theme.palette.error.main , theme.palette.success.main,  theme.palette.primary.main],
      },
      title: 'وضعیت آنالیز',
      gridProps: { xs: 6, xl: 3 },
      skeletonHeight: 400,
      withCard: true,
    },
    {
      component: PictorialBar,
      props: { data: events?.multiav_time_chart },
      gridProps: { xs: 12 },
      skeletonHeight: 400,
      withCard: true,
    },
  ];

  return (
    <PageBox
      title="نتایج ضد ویروس مرکب"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={fieldsQueries}
    >
      <PanelComponent loading={loading} components={components} />
    </PageBox>
  );
};

export default AntivirusResults;
