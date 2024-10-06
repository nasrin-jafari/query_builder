import { CustomDataGrid } from '@/components';
import { Box } from '@mui/material';
import React from 'react';

const DetailsLog: React.FC = () => {
  return (
    <Box>
      <CustomDataGrid loading={false} pageTotal={1} columns={[]} rows={[]} />
    </Box>
  );
};

export default DetailsLog;
