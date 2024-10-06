import { Box, Paper } from '@mui/material';
import CustomTabs from '../../../components/common/CustomTabs';
import React from 'react';
import AiUpload from '@/sections/intelligence/managementOfServices/AiUploader';
import MultiServices from '@/sections/intelligence/managementOfServices/MultiServices';
import { useTheme } from '@mui/material/styles';
import YaraUpload from '@/sections/intelligence/managementOfServices/YaraUpload';

const ManagementOfServices = () => {
  const theme = useTheme();
  const tabs = [
    {
      label: 'بر اساس مدل های هوش مصنوعی',
      content: (
        <Box sx={{ display: 'flex', width: '100%' }}>
          <AiUpload />
        </Box>
      ),
    },
    {
      label: 'موتور های پس زمینه',
      content: <YaraUpload />,
    },
    {
      label: 'سرویس های کمکی',
      content: <MultiServices />,
    },
  ];

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '40px' }}
    >
      <Paper
        elevation={3}
        sx={{
          minWidth: { xs: '900px', lg: '1100px' },
          paddingTop: '10px',
          background: theme.palette.grey[300],
          display: 'flex',
        }}
      >
        <CustomTabs tabs={tabs} />
      </Paper>
    </Box>
  );
};

export default ManagementOfServices;
