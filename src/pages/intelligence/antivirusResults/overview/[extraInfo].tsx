import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { multiav_details } from '@/constants/tableHeaders';
import UseApi from '@/hooks/UseApi';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface ExtraInfoData {
  [key: string]: any;
}

interface FetchDataResponse {
  Data: ExtraInfoData[];
  Total: number;
}
const ExtraInfo = () => {
  const router = useRouter();
  const [_, setNewData] = useState<ExtraInfoData[]>([]);

  const { extraInfo } = router.query;
  const { data, total, loading } = UseApi<FetchDataResponse>(`/multiav/detected/${extraInfo}/`);

  const formatedData = (): void => {
    try {
      const formated =
        data?.Data?.map((agent: ExtraInfoData) => ({
          ...agent,
          infected: agent.infected === 'Clean' ? 'we' : 'غیرفعال',
        })) ?? []; // Ensure formated is always an array

      setNewData(formated);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    formatedData();
  }, [data]);

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
