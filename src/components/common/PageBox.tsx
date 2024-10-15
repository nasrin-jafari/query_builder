import { Box, Typography, useTheme } from '@mui/material';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import CustomAppBar from '@/layout/CustomAppBar';

export interface Fields {
  selectOptions?: Fields[];
  dataType: 'number' | 'text' | 'date' | 'checkbox';
  headerName?: string;
  field: string;
  isHeader: boolean;
}

interface PageBoxProps {
  title: string | string[] | undefined;
  description?: string;
  children: ReactNode;
  searchQuery?: Fields[];
}

const PageBox: React.FC<PageBoxProps> = ({
  searchQuery,
  title,
  description = 'توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا',
  children,
}) => {
  const theme = useTheme();

  return (
    <>
      <CustomAppBar SearchFields={searchQuery} title={title} />
      <Box
        sx={{
          position: 'relative',
          backgroundColor: theme.palette.grey[100],
          padding: '28px 30px',
          borderRadius: '14px',
        }}
      >
        <Head>
          <title>EDR / {title}</title>
        </Head>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4">{title}</Typography>
              <Typography color={theme.palette.grey[700]} sx={{ mt: '10px' }}>
                {description}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>{children}</Box>
      </Box>
    </>
  );
};

export default PageBox;
