import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { inspectQuarantined } from '@/constants/tableHeaders';
import UseApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';

interface UnsuccessfulAttemptsData {
  accessed_file_path: string;
  agent_id: string;
  hash_md5: string;
  pid: number;
  score: number;
  tag: string;
  timestamp: number;
}
interface HandleApiRequestResponse {
  Data: UnsuccessfulAttemptsData[];
}

const InspectQuarantined = () => {
  const router = useRouter();
  const { agent_id, agentName } = router.query;
  const { data, total, loading } = UseApi<HandleApiRequestResponse>(
    `/agents/specific/quarantined/${agent_id}/`
  );

  return (
    <PageBox title={` قرنطینه شده های عامل ${agentName}`} searchQuery={inspectQuarantined}>
      <CustomDataGrid
        pageTotal={total}
        loading={loading}
        columns={inspectQuarantined}
        rows={data?.Data || []}
      />
    </PageBox>
  );
};
export default InspectQuarantined;
