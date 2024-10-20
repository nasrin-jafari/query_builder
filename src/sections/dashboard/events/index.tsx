import { ChartDataItem } from '@/components/chart/type';
import AgentActivity from './AgentActivity';
import EventStatus from './EventStatus';
import LicenseAgents from './LicenseAgents';
import { FC } from 'react';
import { Grid } from '@mui/material';

interface EventsProps {
  data: {
    events_status: ChartDataItem[];
    agents_activity_status: ChartDataItem[];
    licence_status: ChartDataItem[];
  };
  isLoading: boolean;
}

const Events: FC<EventsProps> = ({ data, isLoading }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 0.15 }}>
      <EventStatus data={data?.events_status} isLoading={isLoading} />
      <LicenseAgents data={data?.licence_status} isLoading={isLoading} />
      <AgentActivity data={data?.agents_activity_status} isLoading={isLoading} />
    </Grid>
  );
};

export default Events;
