import { CustomDataGrid } from '@/components';
import PictorialBar from '@/components/chart/PictorialBar';
import PieChart from '@/components/chart/PieChart';
import RadarChart from '@/components/chart/RadarChart';
import PageBox from '@/components/common/PageBox';
import {  quarantined_files } from '@/constants/tableHeaders';
// import useApi from '@/hooks/UseApi';
import PanelComponent from '@/layout/PanelComponent';
import { dataAllEvents, dataEvents, dataTopAg, dataTopEvents } from '@/constants/dummyData';
import { useEffect, useState } from 'react';
import { inspectQuarantined } from '@/constants/tableHeaders';

//
// interface QuarantinedResponse {
//   Data?: any[];
//   top_agents?: any[];
//   top_tags?: any[];
//   events_time_chart?: any[];
// }
const headersCol = quarantined_files?.slice(1, 6);

const components = [
  {
    component: PictorialBar,
    props: {
      colors: ['#fcb8b8', '#f28e8e'],
      data: dataEvents,
      height: '100%',
      width: '100%',
      sx: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
    },
    title: 'تایتل 1'     ,
    gridProps: { xs: 6, xl: 6 },
    skeletonHeight: 400,
    withCard: true,
  },
  {
    component: RadarChart,
    props: { data: dataTopEvents, width: '100%', height: '100%' },
    title: 'تایتل 2'     ,
    gridProps: { xs: 6, xl: 3 },
    skeletonHeight: 400,
    withCard: true,
  },
  {
    component: PieChart,
    props: {
      height: '100%',
      data: dataTopAg,
      renderBottomText: true,
    },
    title: 'تایتل 3'     ,
    gridProps: { xs: 6, xl: 3 },
    skeletonHeight: 400,
    withCard: true,
  },
  {
    component: CustomDataGrid,
    props: {
      rows:dataAllEvents,
      columns: headersCol,
      linkOverview: '/activity/quarantined',
      notExtra: true,
    },
    gridProps: { xs: 12 },
    skeletonHeight: 400,
    withCard: false,
  },
];

const Home = () => {
  // const { data: all_events_Data, loading } = useApi<QuarantinedResponse>(
  //   '/agents/quarantined_files/?per_page=5'
  // );
  // const { data } = useApi<QuarantinedResponse>('/agents/quarantined/');
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const timer =   setTimeout(()=>{
      setLoading(false)
    },3000)
    return ()=> {
      clearTimeout(timer)
    }
  }, []);
  return (
    <PageBox  title=" داشبورد" searchQuery={inspectQuarantined}>

      <PanelComponent loading={loading} components={components} />
    </PageBox>
  );
};

export default Home;
