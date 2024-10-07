import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { Box } from '@mui/material';
import React from 'react';

// Interface for log data
interface LogData {
  name: string;
}

interface DetailsLogProps {
  data: LogData[];
  pageTotal: number;
}

const DetailsLog: React.FC<DetailsLogProps> = ({ data, pageTotal }) => {
  const aiUpload = [{ field: 'name', headerName: 'نام فایل', dataType: 'text', isHeader: true }];

  return (
    <Box>
      <PageBox title="asdsad">
        <CustomDataGrid
          loading={false}
          pageTotal={pageTotal}
          columns={aiUpload}
          rows={data}
          notExtra
        />
      </PageBox>
    </Box>
  );
};

// This function runs at build time and fetches data for the page
export const getStaticProps = async () => {
  // Fetch your data here (e.g., from an API)
  const data = [
    {
      name: 'alireza',
    },
  ];

  // You can also calculate the total pages
  const pageTotal = 2;

  // Return the data as props to the component
  return {
    props: {
      data,
      pageTotal,
    },
  };
};

export default DetailsLog;
