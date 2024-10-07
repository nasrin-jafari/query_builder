// import { CustomDataGrid } from '@/components';
// import headers from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';
import PageBox from '@/components/common/PageBox';
import { Box } from '@mui/material';
import React from 'react';

// interface LogData {
//   Title: {
//     fa: string;
//     en: string;
//   };
//   Data: Array<Record<string, any>>;
// }

// interface UseApiResponse {
//   data: LogData | null;
//   total: number;
//   loading: boolean;
// }

const DetailsLog: React.FC = () => {
  const router = useRouter();
  const { key, logId, logs } = router.query;

  const { data, total, loading } = useApi(`/agents/${logId}/logs/${logs}_${key}/`);
  console.log(data, total, loading);

  // const columns = data?.Title?.en ? headers[data.Title.en] : [];
  // console.log(data, 'data');
  // console.log(total, 'total');
  // console.log(loading, 'loading');
  // console.log(columns, 'col');

  return (
    <Box>
      {/* <CustomDataGrid loading={false} pageTotal={2} columns={[]} rows={[]} notExtra /> */}
      <PageBox title="asdsad">
        <h1></h1>
      </PageBox>
    </Box>
  );
};

export default DetailsLog;
