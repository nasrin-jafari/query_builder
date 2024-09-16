import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { ai } from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';
interface ExtraInfoData {
  [key: string]: any;
}

interface FetchDataResponse {
  Data: ExtraInfoData[];
  Total: number;
}
const ExtraInfoAi = () => {
  const { data, total, loading } = useApi<FetchDataResponse>('/ai/detected/');

  return (
    <PageBox
      title="نتایج هوش مصنوعی"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={ai}
    >
      <CustomDataGrid loading={loading} pageTotal={total} columns={ai} rows={data?.Data ?? []} />
    </PageBox>
  );
};

export default ExtraInfoAi;
