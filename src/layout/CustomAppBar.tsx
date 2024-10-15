import { FetchTimer, ProfileMenu, ThemeToggleButton } from '@/components';
import UseApi from '@/hooks/UseApi';
import { LicenseData } from '@/sections/settings/licence';
import { ConvertRemainingDays } from '@/utils/ConvertRemainingDays';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { FaTimes } from 'react-icons/fa';
import SearchQueryBuilder, { Field } from '@/components/advanceSearch/SearchQueryBuilder';

export interface Fields {
  selectOptions?: Fields[];
  dataType: 'number' | 'text' | 'date' | 'checkbox';
  headerName?: string;
  field: string;
  isHeader: boolean;
}
interface CustomAppBarProps {
  title: string | string[] | undefined;
  SearchFields?: Fields[];
}

const CustomAppBar: React.FC<CustomAppBarProps> = ({ SearchFields, title }) => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { data } = UseApi<LicenseData[]>('/licence/info/');
  const handleClicked = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setOpen(false), 300);
  };
  function updateTitlesToLabels(fieldsWithoutId: Fields[]): Field[] {
    return fieldsWithoutId.map((item) => {
      const { headerName, field, ...rest } = item;
      return {
        ...rest,
        label: headerName ?? 'Default Label',
        value: field ?? 'Default value',
        selectOptions: item.selectOptions ? updateTitlesToLabels(item.selectOptions) : undefined,
      };
    });
  }

  const outPutFields = (SearchFields && updateTitlesToLabels(SearchFields)) || [];
  const isFieldArray = (data: any): data is Fields[] => {
    return Array.isArray(data) && data.every((item) => 'label' in item && 'value' in item);
  };
  const fields = isFieldArray(outPutFields) ? outPutFields : [];
  const isSearch = fields.length == 1;
  return (
    <Box
      sx={{
        background: theme.palette.grey[50],
        width: '100%',
        pb: 1.5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            alt="Image"
            width={40}
            height={42}
            src="/images/logo.png"
            priority
            style={{ marginLeft: 15 }}
          />
          <Link href="/settings/licence">
            <Typography fontWeight={'bold'} fontSize={14}>
              وضعیت لایسنس :{' '}
              <span style={{ color: theme.palette.primary.main }}>
                {data && ConvertRemainingDays(data[0]?.days_to_expire)}
              </span>{' '}
              باقی مانده
            </Typography>
            <Typography color="primary.main" fontWeight={'bold'} fontSize={10}></Typography>
            <Typography fontWeight={'bold'} fontSize={10}></Typography>
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {fields?.length > 0 && (
            <Button
              onClick={handleClicked}
              variant="contained"
              style={{
                color: theme.palette.grey[200],
                background: theme.palette.grey[100],
                borderRadius: '14px',
                paddingLeft: '80px',
              }}
              startIcon={
                <IoSearch
                  style={{
                    color: theme.palette.grey[200],
                    fontSize: '20px',
                  }}
                />
              }
            >
              جستجو...
            </Button>
          )}
          <FetchTimer />
          <ThemeToggleButton />
          <ProfileMenu />
        </Box>
      </Box>
      <Box
        onClick={handleClose}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: open ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
          zIndex: 1300,
          display: open ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          visibility: open ? 'visible' : 'hidden',
          opacity: open ? 1 : 0,
          transition: 'visibility 0s linear 0.3s, opacity 0.3s linear',
        }}
      >
        <Box
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          sx={{
            backgroundColor: theme.palette.grey[100],
            borderRadius: '20px',
            padding: '40px',
            boxShadow: 4,
            width: isSearch ? '50% ' : '70%',
            position: 'relative',
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              padding: '5px',
              fontSize: '24px',
              color: theme.palette.primary.main,
            }}
          >
            <FaTimes color={theme.palette.primary.main} />
          </Button>
          <Typography variant="h6" sx={{ marginBottom: '10px', textAlign: 'center' }}>
            جستجو در {title}
          </Typography>
          <Box
            sx={{
              position: 'relative',
              height: isSearch ? '200px' : '500px',
              maxHeight: '650px',
              overflowY: 'auto',
              overflowX: 'hidden',
              paddingRight: '20px',
              '&::-webkit-scrollbar': {
                width: '7px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: theme.palette.grey[200],
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.primary.main,
                borderRadius: '6px',
              },
            }}
          >
            <SearchQueryBuilder fields={fields} setOpen={setOpen} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomAppBar;
