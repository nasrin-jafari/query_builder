import { dashboard } from '@/api/dashboard';
import CustomTabs from '@/components/common/CustomTabs';
import { AppDispatch, RootState } from '@/redux/store';
import Events from '@/sections/dashboard/events';
import Mitre from '@/sections/dashboard/mitre';
import ResourceConsumption from '@/sections/dashboard/resourceConsumption';
import SpeedTest from '@/sections/dashboard/speedTest';
import Status from '@/sections/dashboard/status';
import { Box, Divider, styled } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomAppBar from '@/layout/CustomAppBar';
import Head from 'next/head';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(dashboard());
  }, [router.query]);
  const { data, isLoading } = useSelector((state: RootState) => state.dashboard);
  const CustomDivider = styled(Divider)(() => ({
    marginLeft: 0,
    marginTop: 20,
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

  const tabs = [
    {
      label: 'پیش فرض',
      content: (
        <>
          <>
            <Status data={data} isLoading={isLoading} />
          </>
          <>
            <Mitre data={data} isLoading={isLoading} />
          </>
          <>
            <Events data={data} isLoading={isLoading} />
          </>

          <>
            <SpeedTest data={data?.speed_test} isLoading={isLoading} />
          </>
          <>
            <ResourceConsumption data={data?.progress_bars} isLoading={isLoading} />
          </>
        </>
      ),
    },
    {
      label: 'وضعیت منابع',
      content: (
        <>
          <CustomDivider textAlign="left">وضعیت منابع</CustomDivider>
          <Status data={data} isLoading={isLoading} />,
        </>
      ),
    },
    {
      label: 'رویداد',
      content: (
        <>
          <CustomDivider textAlign="left">وضعیت رویدادها </CustomDivider>
          <Events data={data} isLoading={isLoading} />,
        </>
      ),
    },
    {
      label: 'MITRE',
      content: (
        <>
          <CustomDivider textAlign="left">تهدیدات MITRE </CustomDivider>
          <Mitre data={data} isLoading={isLoading} />,
        </>
      ),
    },
    {
      label: 'رخدادها',
      content: (
        <>
          <CustomDivider textAlign="left">سرعت سرور </CustomDivider>
          <SpeedTest data={data?.speed_test} isLoading={isLoading} />
        </>
      ),
    },
    {
      label: 'منابع ',
      content: (
        <>
          <CustomDivider textAlign="left">منابع مورد استفاده </CustomDivider>
          <ResourceConsumption data={data?.progress_bars} isLoading={isLoading} />,
        </>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>سامانه EDR</title>
      </Head>
      <Box>
        <CustomAppBar title={'داشبورد'} sx={{ px: 3, mb: '-10px' }} />
        <CustomTabs tabs={tabs} orientation="vertical" />
      </Box>
    </>
  );
}
