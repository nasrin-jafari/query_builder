import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import headers from '@/constants/tableHeaders';

import useApi from '@/hooks/UseApi';
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

  const columns = headers[`${logs} ${key}`.replace(/\s+/g, '_').toLowerCase()];
  return (
    <>
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
    </>
  );
};

export default DetailsLog;
