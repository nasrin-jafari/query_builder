import { CustomDataGrid } from '@/components';
import PictorialBar from '@/components/chart/PictorialBar';
import PieChart from '@/components/chart/PieChart';
import RadarChart from '@/components/chart/RadarChart';
import PageBox from '@/components/common/PageBox';
import { all_events, fieldsQueries } from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';
import PanelComponent from '@/layout/PanelComponent';
import { useRouter } from 'next/router';

// Define types for your data
interface EventData {
  event_title: string;
  timestamp: number;
  agent_ip: string;
  computer_name: string;
  agent_core_version: string;
}

interface EventsResponse {
  Data?: EventData[];
  top_events?: any[];
  top_agents?: any[];
  events_time_chart?: any[];
}

const ActivityEvents = () => {
  const { data: all_events_Data, loading } = useApi<EventsResponse>(
    '/agents/all_events/?per_page=5'
  );
  const { data: events } = useApi<EventsResponse>('/agents/events/');
  const headersCol = all_events?.slice(0, 4);
  const router = useRouter();

  const components = [
    {
      component: CustomDataGrid,
      props: {
        rows: all_events_Data?.Data,
        columns: headersCol,
        linkOverview: '/activity/events/overview',
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
        height: '100%',
        data: events?.top_events?.map((log) => ({
          ...log,
          redirectTo: '/activity/events/inspect/',
          query: {
            ...router.query,
            event_type: log.en,
            agent_id: 'all_logs',
            title: 'لاگ های ' + log.fa,
          },
        })),
        renderBottomText: true,
      },
      title: 'تاپ ها',
      gridProps: { xs: 6, xl: 3 },
      skeletonHeight: 400,
      withCard: true,
    },
    {
      component: RadarChart,
      props: { data: events?.top_agents, width: '100%', height: '100%' },
      title: 'تکنیک ها',
      gridProps: { xs: 6, xl: 3 },
      skeletonHeight: 400,
      withCard: true,
    },
    {
      component: PictorialBar,
      props: { data: events?.events_time_chart },
      gridProps: { xs: 12 },
      skeletonHeight: 400,
      withCard: true,
    },
  ];

  return (
    <PageBox title="رخدادها" searchQuery={fieldsQueries}>
      <PanelComponent loading={loading} components={components} />
    </PageBox>
  );
};

export default ActivityEvents;
