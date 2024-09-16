import PageBox from '@/components/common/PageBox';
import { fieldsQueries } from '@/constants/tableHeaders';
import { useRouter } from 'next/router';
import useApi from '@/hooks/UseApi';
import pieChart from '@/components/chart/PieChart';
import PanelComponent from '@/layout/PanelComponent';
import { ChartDataItem } from '@/components/chart/type';
import BiaxialLineChart from '@/components/chart/BiaxialLineChart';

interface AnalysisData {
  event_counts_by_type: ChartDataItem[];
  event_counts_by_action: ChartDataItem[];
  top_five_result: {
    add: ChartDataItem[];
    delete: ChartDataItem[];
    modified: ChartDataItem[];
  };
  chart_per_time: ChartDataItem[];
}

const Analysis = () => {
  const router = useRouter();
  const { eventType, logId, eventTypeFa } = router.query;
  const { data, loading } = useApi<AnalysisData>(`/agents/${logId}/analysis/${eventType}/`);
  const components = [
    {
      component: pieChart,
      props: {
        data: data?.event_counts_by_type,
        loading: loading,
        renderBottomText: true,
        width: 350,
        height: 'auto',
        defaultChart: 'tentaclePie',
      },
      title: `تعداد ${eventTypeFa} ها بر اساس تایپ`,
      gridProps: { xs: 6, xl: 4 },
      skeletonHeight: 400,
      withCard: true,
    },
    {
      component: pieChart,
      props: {
        data: data?.event_counts_by_action,
        loading: loading,
        renderBottomText: true,
        width: 350,
        height: 'auto',
      },
      title: `تعداد ${eventTypeFa} ها بر اساس عملیات`,
      gridProps: { xs: 6, xl: 4 },
      skeletonHeight: 400,
      withCard: true,
    },
    {
      component: pieChart,
      props: {
        data: data?.top_five_result?.add,
        loading: loading,
        renderBottomText: true,
        width: 350,
        height: 'auto',
      },
      title: ` ${eventTypeFa} اضافه شده`,
      gridProps: { xs: 6, xl: 4 },
      skeletonHeight: 400,
      withCard: true,
    },
    {
      component: pieChart,
      props: {
        data: data?.top_five_result?.delete,
        loading: loading,
        renderBottomText: true,
        width: 350,
        height: 'auto',
      },
      title: ` ${eventTypeFa} حذف شده`,
      gridProps: { xs: 6, xl: 4 },
      skeletonHeight: 400,
      withCard: true,
    },
    {
      component: pieChart,
      props: {
        data: data?.top_five_result?.modified,
        loading: loading,
        renderBottomText: true,
        width: 350,
        height: 'auto',
      },
      title: ` ${eventTypeFa} ویرایش شده`,
      gridProps: { xs: 6, xl: 4 },
      skeletonHeight: 400,
      withCard: true,
    },
    {
      component: BiaxialLineChart,
      props: {
        data: data?.chart_per_time,
        loading: loading,
        renderBottomText: true,
        width: 350,
        height: '430px',
      },
      title: ` ${eventTypeFa} ویرایش شده`,
      gridProps: { xs: 6, xl: 4 },
      skeletonHeight: 400,
      withCard: true,
    },
  ];

  return (
    <PageBox title={eventTypeFa} searchQuery={fieldsQueries}>
      <PanelComponent loading={loading} components={components} />
    </PageBox>
  );
};

export default Analysis;
