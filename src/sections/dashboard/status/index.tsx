import { FC } from 'react';
import OpratingSystemClient from './OperatingSystemClient';
import ResourceStatus from './ResourceStatus';
import SystemConnectionStatus from './SystemConnectionStatus';
import { ChartDataItem } from '@/components/chart/type';
import { Grid } from '@mui/material';

interface StatusProps {
  data: {
    server_status: {
      disk_space_total: string;
      disk_space_used: string;
      memory_usage_total: string;
      memory_usage_used: string;
      load_average: string;
      uptime: string;
      status_last_fetch_time: string;
    };
    third_party_services: {
      analysis: ChartDataItem[];
      status: ChartDataItem[];
    };
  };
  isLoading: boolean;
}

const Status: FC<StatusProps> = ({ data, isLoading }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <ResourceStatus data={data?.server_status} />
      <OpratingSystemClient data={data?.third_party_services} isLoading={isLoading} />
      <SystemConnectionStatus data={data?.third_party_services} />
    </Grid>
  );
};

export default Status;
