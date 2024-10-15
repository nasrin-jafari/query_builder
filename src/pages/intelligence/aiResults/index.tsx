import { CustomDataGrid } from '@/components';
import PictorialBar from '@/components/chart/PictorialBar';
import PieChart from '@/components/chart/PieChart';
import PageBox from '@/components/common/PageBox';
import { fieldsQueries, multiav } from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';
import PanelComponent from '@/layout/PanelComponent';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';

interface AiResultsData {
  agent_id: string;
  agent_ip: string;
  file_name: string;
  scan_id: string;
  scan_time: string;
  upload_file_source: string;
}

interface Top5AgentAi {
  en: string;
  value: number;
  agent_id: string;
}

interface DetectionResult {
  en: string;
  fa: string;
  value: number;
  redirectTo: string;
}

interface AiTimeChart {
  date: number;
  value: number;
}

interface MultiavData {
  top_agents_ai: Top5AgentAi[];
  detection_result: DetectionResult[];
  ai_time_chart: AiTimeChart[];
}

interface EventsResponse {
  Data?: AiResultsData[];
}

const AiResults = () => {
  const { data: all_detected_Data, loading } = useApi<EventsResponse>('/ai/detected/?per_page=5');
  const { data: events } = useApi<MultiavData>('/ai/analysis/');
  const headersCol = multiav?.slice(0, 3);
  const theme = useTheme();
  const router = useRouter();

  const components = [
    {
      component: PieChart,
      props: {
        data: events?.detection_result.map((item) => ({
          ...item,
          redirectTo: '/intelligence/aiResults/inspect',
          query: { ...router.query, typeDetect: item.en },
        })),
        renderBottomText: true,
        colors: [theme.palette.error.main, theme.palette.success.main],
      },
      title: 'فعال ترین ها',
      gridProps: { xs: 6, xl: 4 },
      skeletonHeight: 400,
      withCard: true,
    },
    {
      component: PieChart,
      props: {
        data: events?.top_agents_ai?.map((item) => ({
          ...item,
          redirectTo: '/intelligence/aiResults/inspect',
          query: { ...router.query, agent_id: item.agent_id },
        })),
        renderBottomText: true,
      },
      title: 'تاپ ترین ها',
      gridProps: { xs: 6, xl: 4 },
      skeletonHeight: 400,
      withCard: true,
    },
    {
      component: PictorialBar,
      props: {
        data: events?.ai_time_chart,
        colors: [theme.palette.info.main, theme.palette.info.light],
        height: '100%',
        width: '100%',
        sx: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        },
      },
      title: 'پر مخاطره ترین ها',

      gridProps: { xs: 6, xl: 4 },
      skeletonHeight: 400,
      withCard: true,
    },
    {
      component: CustomDataGrid,
      props: {
        rows: all_detected_Data?.Data,
        columns: headersCol,
        linkOverview: '/intelligence/aiResults/overview',
        notExtra: true,
        loading,
      },
      gridProps: {
        xs: 12,
      },
      skeletonHeight: 400,
      withCard: false,
    },
  ];

  return (
    <PageBox
      title="نتایج هوش مصنوعی"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={fieldsQueries}
    >
      <PanelComponent loading={loading} components={components} />
    </PageBox>
  );
};

export default AiResults;
