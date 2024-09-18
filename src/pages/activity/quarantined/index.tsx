import { CustomDataGrid } from '@/components';
import PictorialBar from '@/components/chart/PictorialBar';
import PieChart from '@/components/chart/PieChart';
import RadarChart from '@/components/chart/RadarChart';
import PageBox from '@/components/common/PageBox';
import { fieldsQueries, quarantined_files } from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';
import PanelComponent from '@/layout/PanelComponent';
import { useRouter } from 'next/router';

interface QuarantinedResponse {
  Data?: any[];
  top_agents?: any[];
  top_tags?: any[];
  events_time_chart?: any[];
}

const ActivityQuarantined = () => {
  const { data: all_events_Data, loading } = useApi<QuarantinedResponse>(
    '/agents/quarantined-files/?per_page=5'
  );
  const { data: events } = useApi<QuarantinedResponse>('/agents/quarantined/');
  const headersCol = quarantined_files?.slice(1, 6);
  const router = useRouter();

  const components = [
    {
      component: CustomDataGrid,
      props: {
        rows: all_events_Data?.Data,
        columns: headersCol,
        linkOverview: '/activity/quarantined/overview',
        notExtra: true,
      },
      gridProps: { xs: 12, xl: 6 },
      skeletonHeight: 400,
      withCard: false,
    },
    {
      component: PieChart,
      props: {
        data: events?.top_agents?.map((item) => ({
          ...item,
          redirectTo: '/activity/quarantined/inspect',
          query: {
            ...router.query,
            agentName: item.en,
            agent_id: item.redirectTo.replace(/^\/+/, ''),
          },
        })),

        renderBottomText: true,
      },
      title: 'پر مخاطره ترین ها',
      gridProps: { xs: 6, xl: 3 },
      skeletonHeight: 400,
      withCard: true,
    },
    {
      component: RadarChart,
      props: { data: events?.top_tags, width: '100%', height: '100%' },
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
    <PageBox
      searchQuery={fieldsQueries}
      title="قرنطینه شده‌ها"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
    >
      <PanelComponent loading={loading} components={components} />
    </PageBox>
  );
};

export default ActivityQuarantined;
