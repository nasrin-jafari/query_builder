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
  return (
    <Grid item md={6} xs={12}>
      <CardBox sx={{ mt: 2 }}>
        <Typography variant="h6">{title}</Typography>
        <Box sx={{ width: '100%' }}>
          <ProgressBar total={total ?? 0} usage={usage ?? 0} />
        </Box>
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
