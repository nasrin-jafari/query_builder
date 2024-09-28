import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { inspectAi } from '@/constants/tableHeaders';
import UseApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';

interface InspectAiResultsData {
  computer_name: string;
  local_endpoint_ip_address: string;
  agent_core_version: string;
  last_time: string;
  status: string | boolean;
  license_status: string | boolean;
}
interface HandleApiRequestResponse {
  Data: InspectAiResultsData[];
}

const InspectAiResults = () => {
  const router = useRouter();
  const { typeDetect, agent_id } = router.query;

  const url = agent_id ? `/ai/specific-ai/${agent_id}/` : `/ai/detection-type/${typeDetect}/`;

  const { data, total, loading } = UseApi<HandleApiRequestResponse>(url);
  const filterInspectAi = inspectAi.filter(
    (item) => item.field !== 'agent_id' && item.field !== 'agent_ip'
  );
  const tableHeaders = agent_id ? filterInspectAi : inspectAi;
  return (
    <PageBox
      title={`نتایج هوش مصنوعی   ${typeDetect ? typeDetect : agent_id}`}
      searchQuery={tableHeaders}
    >
      <CustomDataGrid
        pageTotal={total}
        loading={loading}
        columns={inspectAi}
        rows={data?.Data ?? []}
      />
    </PageBox>
  );
};
export default InspectAiResults;
