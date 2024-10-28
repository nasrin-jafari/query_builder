import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { quarantined_files } from '@/constants/tableHeaders';
// import useApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';
import { exportFiles } from '@/utils/DownloadFiles';
import { allDataTable } from '@/constants/dummyData';
import { useEffect, useState } from 'react';

// interface QuarantinedData {
//   [key: string]: any;
// }
// interface FetchDataResponse {
//   Data: QuarantinedData[];
//   Total: number;
// }
const QuarantinedOverview = () => {
  // const { data, total, loading } = useApi<FetchDataResponse>('/agents/quarantined_files/');
  const router = useRouter();
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const timer =   setTimeout(()=>{
      setLoading(false)
    },3000)
    return ()=> {
      clearTimeout(timer)
    }
  }, []);
  return (
    <PageBox searchQuery={quarantined_files} title="قرنطینه شده ها">
      <CustomDataGrid
        loading={loading}
        pageTotal={allDataTable?.length}
        columns={quarantined_files}
        rows={allDataTable ?? []}
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
            onClick: (_, data) => {
              exportFiles({
                path: `/agents/quarantined_files/${data?.extra_information?.hash_sha256}/`,
                fileName: `${data?.hash_md5}.q`,
                type: 'file',
              });
            },
          },
        ]}
      />
    </PageBox>
  );
};

export default QuarantinedOverview;
