import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import UseApi from '@/hooks/UseApi';
import PageBox from '@/components/common/PageBox';
import { multiav_details } from '@/constants/tableHeaders';
import { CustomDataGrid } from '@/components';

interface ExtraInfoData {
  [key: string]: any;
}

interface FetchDataResponse {
  Data: ExtraInfoData[];
  Total: number;
}
const ExtraInfo = () => {
  const router = useRouter();

  const { extraInfo } = router.query;
  const { data, total, loading } = UseApi<FetchDataResponse>(`/multiav/detected/${extraInfo}/`);

  return (
    <PageBox
      title=" جزییات نتایج ضد ویروس مرکب"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={multiav_details}
    >
      <Grid container>
        <Grid item sm={12}>
          <CustomDataGrid
            rows={data?.Data ?? []}
            columns={multiav_details}
            loading={loading}
            pageTotal={total}
            notExtra
          />
        </Grid>
      </Grid>
    </PageBox>
  );
};

export default ExtraInfo;
