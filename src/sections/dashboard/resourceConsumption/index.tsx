import ProgressBar from '@/components/chart/ProgressBar';
import CardBox from '@/layout/CardBox';
import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';

interface UsageItemProps {
  title: string;
  total: number | undefined;
  usage: number | undefined;
}

interface ResourceConsumptionProps {
  data: {
    memory_usage?: {
      total?: number;
      used?: number;
    };
    disk_space?: {
      total?: number;
      used?: number;
    };
  };
}

export const UsageItem: FC<UsageItemProps> = ({ title, total, usage }) => {
  const percentage = total ? ((usage ?? 0) / total) * 100 : 0;

  return (
    <Grid item md={6} xs={12}>
      <CardBox sx={{ mt: 2, pb: 0 }}>
        <Grid container>
          <Grid item md={6}>
            <Typography fontWeight="bold" variant="h6">
              {title}
            </Typography>
            <Typography fontWeight="bold" variant="h5">
              {total ? `${percentage.toFixed(2)}%` : 'اطلاعات موجود نیست'}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Box sx={{ width: '100%' }}>
              <ProgressBar total={total ?? 0} usage={usage ?? 0} />
            </Box>
          </Grid>
        </Grid>
      </CardBox>
    </Grid>
  );
};

const ResourceConsumption: FC<ResourceConsumptionProps> = ({ data }) => {
  return (
    <>
      <Grid container spacing={2}>
        <UsageItem
          title="میزان مصرف حافظه"
          total={data?.memory_usage?.total}
          usage={data?.memory_usage?.used}
        />
        <UsageItem
          title="میزان مصرف دیسک"
          total={data?.disk_space?.total}
          usage={data?.disk_space?.used}
        />
      </Grid>
    </>
  );
};

export default ResourceConsumption;
