import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { quarantined_files } from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';

interface QuarantinedData {
  [key: string]: any;
}
interface FetchDataResponse {
  Data: QuarantinedData[];
  Total: number;
}
const QuarantinedOverview = () => {
  const { data, total, loading } = useApi<FetchDataResponse>('/agents/quarantined-files/');

  return (
    <PageBox searchQuery={quarantined_files} title="قرنطینه شده ها"
    >
      <CustomDataGrid
        loading={loading}
        pageTotal={total}
        columns={quarantined_files}
        rows={data?.Data ?? []}
      />
    </PageBox>
  );
};

export default QuarantinedOverview;
