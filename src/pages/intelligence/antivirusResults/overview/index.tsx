import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { multiav } from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';
interface ExtraInfoData {
  [key: string]: any;
}

interface FetchDataResponse {
  Data: ExtraInfoData[];
  Total: number;
}
const ExtraInfo = () => {
  const { data, total, loading } = useApi<FetchDataResponse>('/multiav/detected/');
  const router = useRouter();

  return (
    <PageBox
      title="نتایج ضد ویروس مرکب"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={multiav}
    >
      <CustomDataGrid
        loading={loading}
        pageTotal={total}
        columns={multiav}
        rows={data?.Data ?? []}
        buttons={[
          {
            label: 'جزئیات پویش',
            type: 'simple',
            onClick: (_, row) => {
              router.push({
                pathname: '/intelligence/antivirusResults/overview/[extraInfo]',
                query: {
                  extraInfo: row?.scan_id,
                },
              });
            },
          },
        ]}
      />
    </PageBox>
  );
};

export default ExtraInfo;
