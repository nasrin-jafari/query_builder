import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { all_events } from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';
interface EventData {
  [key: string]: any;
}

interface FetchDataResponse {
  Data: EventData[];
  Total: number;
}
const EventsOverview = () => {
  const { data, total, loading } = useApi<FetchDataResponse>('/agents/all_events/');

  return (
    <PageBox
      searchQuery={all_events}
      title="رخدادها"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
    >
      <CustomDataGrid
        loading={loading}
        pageTotal={total}
        columns={all_events}
        rows={data?.Data ?? []}
      />
    </PageBox>
  );
};

export default EventsOverview;
