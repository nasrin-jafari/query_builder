import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { agents } from '@/constants/tableHeaders';
import UseApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';

interface InspectHostManagementData {
  computer_name: string;
  local_endpoint_ip_address: string;
  agent_core_version: string;
  last_time: string;
  status: string | boolean;
  license_status: string | boolean;
}
interface HandleApiRequestResponse {
  Data: InspectHostManagementData[];
}

const InspectHostManagement = () => {
  const router = useRouter();
  const { statusFa, status } = router.query;

  const { data, total, loading } = UseApi<HandleApiRequestResponse>(
    `/dashboard/activity/${status}/`
  );

  return (
    <PageBox title={`${statusFa} (${total})`}>
      <CustomDataGrid
        pageTotal={total}
        loading={loading}
        columns={agents}
        rows={
          data?.Data?.map((agent: any) => ({
            ...agent,
            status: agent.status ? 'فعال' : 'غیرفعال',
            license_status: agent.license_status ? 'فعال' : 'غیرفعال',
          })) ?? []
        }
      />
    </PageBox>
  );
};
export default InspectHostManagement;
