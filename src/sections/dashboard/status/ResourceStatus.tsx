import CardBox from '@/layout/CardBox';
import { Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

interface ServerStatusCardProps {
  titleCard: string;
  Icon: string;
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
    <Grid item md={3} sm={6} xs={12}>
      <CardBox sx={{ background: '#ffffff1c' }}>
        <Typography sx={{ mb: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>
          {titleCard}
        </Typography>
        <Image
          src={Icon}
          width={48} // Set width as a numeric value
          height={48} // Set height as a numeric value
          alt={titleCard}
          style={{ width: 38, height: 38, color: theme.palette.primary.main }}
        />

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
    <Grid item sm={12} xs={12} lg={6}>
      <CardBox title="وضعیت منابع سرور">
        <Grid container spacing={2} sx={{ mt: 2, textAlign: 'center' }}>
          <ServerStatusCard
            titleCard="Memory"
            Icon="/images/icons/uptime.png"
            description={`کل:${data?.memory_usage_total}`}
            title={`استفاده: ${data?.memory_usage_used}`}
          />
          <ServerStatusCard
            titleCard="Load Average"
            Icon="/images/icons/loadavrage.png"
            // Icon={BiSolidTachometer}
            title={`${data?.load_average}`}
          />{' '}
          <ServerStatusCard
            titleCard="Disk Space"
            Icon="/images/icons/diskspace.png"
            description={`کل:${data?.disk_space_total}`}
            title={`استفاده: ${data?.disk_space_used}`}
          />{' '}
          <ServerStatusCard
            titleCard="Uptime"
            Icon="/images/icons/uptime.png"
            title={`${data?.uptime}`}
          />
        </Grid>
      </CardBox>
    </Grid>
  );
};

export default ResourceStatus;
