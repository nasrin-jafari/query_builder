import CardBox from '@/layout/CardBox';
import { Divider, Grid, Typography, useTheme } from '@mui/material';
import { ElementType, FC } from 'react';
import { AiFillClockCircle } from 'react-icons/ai';
import { BiSolidTachometer } from 'react-icons/bi';
import { BsDeviceHddFill } from 'react-icons/bs';
import { FaMemory } from 'react-icons/fa';

interface ServerStatusCardProps {
  titleCard: string;
  Icon: ElementType;
  title: string;
  description?: string;
}
interface ResourceStatusProps {
  data: {
    disk_space_total: string;
    disk_space_used: string;
    memory_usage_total: string;
    memory_usage_used: string;
    load_average: string;
    uptime: string;
    status_last_fetch_time: string;
  };
}

const ServerStatusCard: FC<ServerStatusCardProps> = ({ titleCard, Icon, title, description }) => {
  const theme = useTheme();

  return (
    <Grid item md={3} sm={6} xs={12} sx={{ minHeight: '150px' }}>
      <CardBox minHeight={'150px'}>
        <Typography sx={{ mb: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
          {titleCard}
        </Typography>
        <Icon size={38} color={theme.palette.primary.main} />

        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 'bold',
            color: theme.palette.grey[700],
          }}
        >
          {description}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            color: theme.palette.grey[700],
            fontWeight: 'bold',
          }}
        >
          {title}
        </Typography>
      </CardBox>
    </Grid>
  );
};

const ResourceStatus: FC<ResourceStatusProps> = ({ data }) => {
  return (
    <Grid item sm={12} xs={12} lg={5}>
      <CardBox minHeight={'270px'}>
        <Divider sx={{ fontSize: '17px' }}>وضعیت منابع سرور</Divider>
        <Grid container spacing={2} sx={{ mt: 2, textAlign: 'center' }}>
          <ServerStatusCard
            titleCard="Memory"
            Icon={FaMemory}
            description={`کل:${data?.memory_usage_total}`}
            title={`استفاده: ${data?.memory_usage_used}`}
          />
          <ServerStatusCard
            titleCard="Load Average"
            Icon={BiSolidTachometer}
            title={`${data?.load_average}`}
          />{' '}
          <ServerStatusCard
            titleCard="Disk Space"
            Icon={BsDeviceHddFill}
            description={`کل:${data?.disk_space_total}`}
            title={`استفاده: ${data?.disk_space_used}`}
          />{' '}
          <ServerStatusCard titleCard="Uptime" Icon={AiFillClockCircle} title={`${data?.uptime}`} />
        </Grid>
      </CardBox>
    </Grid>
  );
};

export default ResourceStatus;
