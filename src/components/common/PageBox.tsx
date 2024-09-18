import SearchQueryBuilder, { Field } from '@/components/advanceSearch/SearchQueryBuilder';
import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { ReactNode, useRef, useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

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
  const [open, setOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClicked = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setOpen(false), 300);
  };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
  //     handleClose();
  //   }
  // };

  // useEffect(() => {
  //   if (open) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //     return () => document.removeEventListener('mousedown', handleClickOutside);
  //   }
  // }, [open]);

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

  const outPutFields = (searchQuery && updateTitlesToLabels(searchQuery)) || [];
  const isFieldArray = (data: any): data is Fields[] => {
    return Array.isArray(data) && data.every((item) => 'label' in item && 'value' in item);
  };
  const fields = isFieldArray(outPutFields) ? outPutFields : [];

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ mt: 5, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4">{title}</Typography>
            <Typography color={theme.palette.grey[700]} sx={{ mt: '10px' }}>
              {description}
            </Typography>
          </Box>
          {fields?.length > 0 && (
            <Button
              onClick={handleClicked}
              variant="contained"
              style={{
                color: theme.palette.grey[900],
                background: 'transparent',
                border: '1px solid grey',
              }}
              endIcon={<FaFilter style={{ color: theme.palette.primary.main, fontSize: '18px' }} />}
            >
              جستجو پیشرفته
            </Button>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '',
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
          sx={{
            backgroundColor: theme.palette.grey[300],
            borderRadius: '20px',
            padding: '40px',
            boxShadow: 4,
            width: '70%',
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
              height: '500px',
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

      <Box>{children}</Box>
    </Box>
  );
};

export default PageBox;
