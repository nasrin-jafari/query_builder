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

  // اگر key یا logId یا logs مقداردهی نشده‌اند، نمایش لودینگ یا یک مقدار پیش‌فرض
  if (!key || !logId || !logs) {
    return <div>Loading...</div>;
  }

  const { data, total, loading }: UseApiResponse = useApi(`/agents/${logId}/logs/${logs}_${key}/`);

  // بررسی اینکه آیا ستون‌های جدول در headers وجود دارند
  const columnsKey = `${logs} ${key}`.replace(/\s+/g, '_').toLowerCase();
  const columns = headers[columnsKey] || []; // مقدار پیش‌فرض خالی اگر ستون‌ها پیدا نشدند

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
