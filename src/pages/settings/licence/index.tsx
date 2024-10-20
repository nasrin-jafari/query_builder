import CardCharts from '@/components/common/CardCharts';
import CustomTabs from '@/components/common/CustomTabs';
import Licence from '@/sections/settings/licence';
import { Box, Typography } from '@mui/material';
import React from 'react';

const License: React.FC = () => {
  const tabs = [
    {
      label: 'مدیریت لایسنس دستی',
      content: <Licence />,
    },
    {
      label: 'مدیریت لایسنس خودکار',
      content: <Typography>مدیریت لایسنس خودکار در دست ساخت است.</Typography>,
    },
  ];

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '40px' }}
    >
      <CardCharts sx={{ minWidth: '900px' }}>
        <CustomTabs tabs={tabs} />
      </CardCharts>
    </Box>
  );
};

export default License;
