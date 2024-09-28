import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { multiav } from '@/constants/tableHeaders';
import UseApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';

interface InspectAntivirusResultsData {
  agent_id: string;
  agent_ip: string;
  file_name: string;
  scan_id: string;
  scan_time: number;
  upload_file_source: string;
}
interface HandleApiRequestResponse {
  Data: InspectAntivirusResultsData[];
}

const InspectAntivirusResults = () => {
  const router = useRouter();
  const { contentType, computer_name } = router.query;

  const url = contentType
    ? `/multiav/malware-benign/${contentType}/`
    : `/multiav/specific_computer/${computer_name}/`;

  const { data, total, loading } = UseApi<HandleApiRequestResponse>(url);
  const filterMultiav = multiav.filter(
    (item) => item.field !== 'agent_id' && item.field !== 'agent_ip'
  );
  const tableHeaders = contentType ? multiav : filterMultiav;
  return (
    <PageBox
      title={`نتایج ${contentType ? contentType : computer_name}`}
      searchQuery={tableHeaders}
    >
      <CustomDataGrid
        pageTotal={total}
        loading={loading}
        columns={multiav}
        rows={data?.Data ?? []}
      />
    </PageBox>
  );
};
export default InspectAntivirusResults;
