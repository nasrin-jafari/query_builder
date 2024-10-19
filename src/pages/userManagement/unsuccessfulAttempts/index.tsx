import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { unsuccessful_logins } from '@/constants/tableHeaders';
import UseApi from '@/hooks/UseApi';

interface UnsuccessfulAttemptsData {
  id: number;
  agent: string;
  ip_address: string;
  password: string;
  submit_time: number;
  username: string;
}
interface HandleApiRequestResponse {
  Data: UnsuccessfulAttemptsData[];
}

const UnsuccessfulAttempts = () => {
  const { data, total, loading } = UseApi<HandleApiRequestResponse>('/user/unsuccessful_logins/');

  return (
    <PageBox
      title="گزارش تلاش های ناموفق"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={unsuccessful_logins}
    >
      <CustomDataGrid
        pageTotal={total}
        loading={loading}
        columns={unsuccessful_logins}
        rows={data?.Data || []}
        notExtra
      />
    </PageBox>
  );
};

export default UnsuccessfulAttempts;
