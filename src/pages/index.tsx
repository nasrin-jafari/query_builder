import { dashboard } from '@/api/dashboard';
import { AppDispatch, RootState } from '@/redux/store';
import Events from '@/sections/dashboard/events';
import Mitre from '@/sections/dashboard/mitre';
import ResourceConsumption from '@/sections/dashboard/resourceConsumption';
import SpeedTest from '@/sections/dashboard/speedTest';
import Status from '@/sections/dashboard/status';
import { Box, Divider, Grid, styled } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(dashboard());
  }, [router.query]);
  const { data, isLoading } = useSelector((state: RootState) => state.dashboard);
  const CustomDivider = styled(Divider)(() => ({
    marginLeft: 0,
    paddingLeft: 0,
    '&::before': {
      width: '2%',
    },
    '& .MuiChip-root': {
      marginLeft: 0,
    },
    '& .MuiDivider-wrapper': {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
  }));

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <CustomDivider textAlign="left">وضعیت منابع</CustomDivider>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Status data={data} isLoading={isLoading} />
        </Grid>
      </Box>
      <Box sx={{ mb: 3 }}>
        <CustomDivider textAlign="left">وضعیت رویدادها </CustomDivider>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Events data={data} isLoading={isLoading} />
        </Grid>
      </Box>
      <Box sx={{ mb: 3 }}>
        <CustomDivider textAlign="left">تهدیدات MITRE </CustomDivider>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Mitre data={data} isLoading={isLoading} />
        </Grid>
      </Box>
      <Box sx={{ mb: 3 }}>
        <CustomDivider textAlign="left">سرعت سرور </CustomDivider>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <SpeedTest data={data?.speed_test} isLoading={isLoading} />
        </Grid>
      </Box>
      <Box sx={{ mb: 3 }}>
        <CustomDivider textAlign="left">منابع مورد استفاده </CustomDivider>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <ResourceConsumption data={data?.progress_bars} />
        </Grid>
      </Box>
    </>
  );
}
