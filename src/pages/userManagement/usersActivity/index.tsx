import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import UseApi from '@/hooks/UseApi';
import { usersActivity } from '@/constants/tableHeaders';

interface UnsuccessfulAttemptsData {
  datetime: number;
  path: string;
  url_name: string;
  username: string;
}
interface HandleApiRequestResponse {
  Data: UnsuccessfulAttemptsData[];
}
const UsersActivity = () => {
  const { data, total, loading } = UseApi<HandleApiRequestResponse>('/user_logger/action/');

  return (
    <PageBox
      title="گزارش فعالیت کاربران"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={usersActivity}
    >
      <CustomDataGrid
        pageTotal={total}
        loading={loading}
        columns={usersActivity}
        rows={data?.Data || []}
        notExtra
      />
    </PageBox>
  );
};

export default UsersActivity;
