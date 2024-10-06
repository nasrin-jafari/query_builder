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

const DetailsLog: React.FC = () => {
  const router = useRouter();
  const { key, logId, logs } = router.query;

  const { data, total, loading }: UseApiResponse = useApi(`/agents/${logId}/logs/${logs}_${key}/`);
  // Safely access the columns if data and Title.en exist
  const columns = data?.Title?.en ? headers[data.Title.en] : [];
  return (
    <Box>
      <CustomDataGrid
        loading={loading}
        pageTotal={total}
        columns={columns}
        rows={data?.Data ?? []}
      />
    </Box>
  );
};

export default DetailsLog;
