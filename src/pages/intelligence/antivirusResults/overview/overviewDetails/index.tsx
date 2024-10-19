import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { multiav_details } from '@/constants/tableHeaders';
import UseApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';

interface ExtraInfoData {
  [key: string]: any;
}

interface FetchDataResponse {
  Data: ExtraInfoData[];
  Total: number;
}
const ExtraInfo = () => {
  const router = useRouter();

  const { extraInfo } = router.query;
  const { data, total, loading } = UseApi<FetchDataResponse>(`/multiav/results/${extraInfo}/`);

  return (
    <PageBox
      title=" جزییات نتایج ضد ویروس مرکب"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={multiav_details}
    >
      <CustomDataGrid
        rows={data?.Data ?? []}
        columns={multiav_details}
        loading={loading}
        pageTotal={total}
        notExtra
      />
    </PageBox>
  );
};

export default ExtraInfo;
