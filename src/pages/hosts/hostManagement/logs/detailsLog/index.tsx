import PageBox from '@/components/common/PageBox';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from '@mui/material';
import React from 'react';

// Interface for log data
interface LogData {
  name: string;
}

interface DetailsLogProps {
  data: LogData[];
  pageTotal: number;
}

const DetailsLog: React.FC<DetailsLogProps> = ({ data }) => {
  return (
    <Box>
      <PageBox title="Logs Table">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">نام فایل</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

  // Return the data as props to the component
  return {
    props: {
      data,
      pageTotal: 2, // Example value for total pages
    },
  };
};

export default DetailsLog;
