import { CustomDataGrid } from '@/components';
import headers from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

interface LogData {
  Title: {
    fa: string;
    en: string;
  };
  Data: Array<Record<string, any>>;
}

interface UseApiResponse {
  data: LogData | null;
  total: number;
  loading: boolean;
}

const LogsDetails: React.FC = () => {
  const router = useRouter();
  const { key, logId, logs } = router.query;

  const { data, total, loading }: UseApiResponse = useApi(`/agents/${logId}/logs/${logs}_${key}/`);
  const columns = data?.Title?.en ? headers[data.Title.en] : [];
  console.log(data, 'data');
  console.log(total, 'total');
  console.log(loading, 'loading');
  console.log(columns, 'col');

  return (
    <Box>
      {data?.Data ? <p>data</p> : <p>no data</p>}
      <CustomDataGrid loading={false} pageTotal={2} columns={[]} rows={[]} notExtra />
      logs
    </Box>
  );
};

export default LogsDetails;
