import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import headers from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';

interface LogData {
  Title: {
    fa: string;
    en: string;
  };
  Data: Array<Record<string, any>>; // Replace 'any' with specific types if known
}

interface UseApiResponse {
  data: LogData | null;
  total: number;
  loading: boolean;
}

const DetailsLog: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const { data, total, loading }: UseApiResponse = useApi(
    `/agents/${query.logId}/logs/${query.name}/`
  );
  // Safely access the columns if data and Title.en exist
  const columns = data?.Title?.en ? headers[data.Title.en] : [];

  return (
    <PageBox
      title={data?.Title?.fa ?? ' '}
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={columns}
    >
      <CustomDataGrid
        loading={loading}
        pageTotal={total}
        columns={columns}
        rows={data?.Data ?? []}
      />
    </PageBox>
  );
};

export default DetailsLog;
