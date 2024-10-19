import { ChartDataItem } from '@/components/chart/type';
import CardBox from '@/layout/CardBox';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { LuNetwork } from 'react-icons/lu';
import NoData from '@/utils/NoData';

interface ResourceStatusProps {
  data: {
    status: ChartDataItem[];
  };
  isLoading?: boolean;
}

const SystemConnectionStatus: FC<ResourceStatusProps> = ({ data, isLoading }) => {
  const theme = useTheme();
  if (
    !data ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0)
  ) {
    return (
      <Grid item sm={6} lg={3} xs={12}>
        <CardBox title="وضعیت اتصال سامانه‌های کمکی">
          <NoData type="list-vertical" isLoading={isLoading} />{' '}
        </CardBox>
      </Grid>
    );
  }
  return (
    <>
      <Grid item sm={6} lg={3} xs={12}>
        <CardBox title="وضعیت اتصال سامانه‌های کمکی">
          <Box sx={{ pt: 2, pb: 0 }}>
            {data &&
              data?.status.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Box sx={{ display: 'flex' }}>
                    <LuNetwork
                      color={theme.palette.primary.main}
                      size={22}
                      style={{ marginLeft: 5 }}
                    />
                    <Typography fontSize={16}>{item.fa}</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      bgcolor:
                        item.status === 'active'
                          ? theme.palette.success.light
                          : theme.palette.error.light,
                      padding: '5px 2px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: `${theme.shape.borderRadius}px`,
                      minWidth: '150px',
                      height: '30px',
                    }}
                  >
                    <IoMdInformationCircleOutline
                      size={22}
                      style={{ marginLeft: 5 }}
                      color={
                        item.status === 'active'
                          ? theme.palette.success.main
                          : theme.palette.error.main
                      }
                    />
                    <Typography
                      color={
                        item.status === 'active'
                          ? theme.palette.success.main
                          : theme.palette.error.main
                      }
                    >
                      {item.status === 'active' ? 'فعال است' : 'فعال نیست'}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Box>
        </CardBox>
      </Grid>
    </>
  );
};

export default SystemConnectionStatus;
