import { Box, Paper } from '@mui/material';
import CustomTabs from '../../../components/common/CustomTabs';
import AiUploadSection from '@/sections/intelligence/managementOfServices/aiUploadSection';
import React from 'react';

const ManagementOfServices = () => {
  const tabs = [
    {
      label: 'بر اساس مدل های هوش مصنوعی',
      content: (
        <Box sx={{ display: 'flex', width: '100%' }}>
          <AiUploadSection />
        </Box>
      ),
    },
    {
      label: 'موتور های پس زمینه',
      // content: <YaraUpload />,
      content: <p>sss</p>,
    },
  ];

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '40px' }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: '900px', lg: '1290px' },
          paddingTop: '10px',
          background: '#293540',
          display: 'flex',
        }}
      >
        <CustomTabs tabs={tabs} />
      </Paper>
    </Box>
  );
};

export default ManagementOfServices;
