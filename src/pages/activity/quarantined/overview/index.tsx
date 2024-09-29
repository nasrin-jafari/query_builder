import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { quarantined_files } from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';

interface QuarantinedData {
  [key: string]: any;
}
interface FetchDataResponse {
  Data: QuarantinedData[];
  Total: number;
}
const QuarantinedOverview = () => {
  const { data, total, loading } = useApi<FetchDataResponse>('/agents/quarantined-files/');
  const router = useRouter();

  return (
    <PageBox searchQuery={quarantined_files} title="قرنطینه شده ها">
      <CustomDataGrid
        loading={loading}
        pageTotal={total}
        columns={quarantined_files}
        rows={data?.Data ?? []}
        buttons={[
          {
            label: 'نتایج ضد ویروس مرکب',
            type: 'extra',
            onClick: () => {
              router.push({
                pathname: '/intelligence/antivirusResults',
              });
            },
          },
          {
            label: 'دانلود فایل',
            type: 'extra',
            // onClick: (_, data) => {
            //   router.push({
            //     pathname: `/hosts/hostManagement/logs/detailsLog/`,
            //     query: {
            //       logId: data?.extra_information?.agent_id,
            //       key: 'quarantined_files',
            //       logs: 'alerts',
            //     },
            //   });
            // },
          },
        ]}
      />
    </PageBox>
  );
};

export default QuarantinedOverview;
