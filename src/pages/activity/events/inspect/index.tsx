import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { inspect_events } from '@/constants/tableHeaders';
import UseApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';

interface InspectEventsData {
  agent_id: string;
  agent_ip: string;
  file_name: string;
  scan_id: string;
  scan_time: number;
  upload_file_source: string;
}
interface HandleApiRequestResponse {
  Data: InspectEventsData[];
}

const InspectEvents = () => {
  const router = useRouter();
  const { event_type, agent_id, title } = router.query;

  const { data, total, loading } = UseApi<HandleApiRequestResponse>(
    `/agents/${event_type}/overview/${agent_id}/`
  );

  return (
    <PageBox title={`${title} `}>
      <CustomDataGrid
        pageTotal={total}
        loading={loading}
        columns={inspect_events}
        rows={data?.Data ?? []}
      />
    </PageBox>
  );
};
export default InspectEvents;
