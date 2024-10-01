import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { multiav } from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';
import { IoDocumentTextOutline } from 'react-icons/io5';

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
            label: 'جزییات پویش',
            type: 'allowAccess',
            icon: <IoDocumentTextOutline />,
            onClick: (_, row) => {
              router.push({
                pathname: '/intelligence/antivirusResults/overview/overviewDetails/',
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
