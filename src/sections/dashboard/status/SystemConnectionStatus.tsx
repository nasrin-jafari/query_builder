import { ChartDataItem } from '@/components/chart/type';
import CardBox from '@/layout/CardBox';
import { Box, Divider, Grid, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { LuNetwork } from 'react-icons/lu';

interface ResourceStatusProps {
  data: {
    status: ChartDataItem[];
  };
}

const SystemConnectionStatus: FC<ResourceStatusProps> = ({ data }) => {
  const theme = useTheme();
  return (
    <>
      <Grid item sm={6} lg={3} xs={12}>
        <CardBox minHeight={'270px'}>
          <Divider sx={{ fontSize: '17px' }}>وضعیت اتصال سامانه‌های کمکی</Divider>
          <Box sx={{ p: 2, pb: 0 }}>
            {data &&
              data?.status.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Box sx={{ display: 'flex' }}>
                    <LuNetwork
                      color={theme.palette.primary.main}
                      size={22}
                      style={{ marginLeft: 5 }}
                    />
                    <Typography>{item.fa}</Typography>
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
