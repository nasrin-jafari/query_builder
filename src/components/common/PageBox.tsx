import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { ConfirmationDialog } from '@/components';
import SearchQueryBuilder, { Field } from '@/components/advanceSearch/SearchQueryBuilder';

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

  const handleClicked = () => {
    setOpen(true);
  };

  const onCloseHandle = () => {
    setOpen(false); // Close the modal
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

  const outPutFields = (searchQuery && updateTitlesToLabels(searchQuery)) || [];
  const isFieldArray = (data: any): data is Fields[] => {
    return Array.isArray(data) && data.every((item) => 'label' in item && 'value' in item);
  };
  const fields = isFieldArray(outPutFields) ? outPutFields : [];

  return (
    <Box>
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

      <Box>{children}</Box>
      {fields?.length > 0 && (
        <ConfirmationDialog
          open={open}
          title="جستجوی پیشرفته"
          content={<SearchQueryBuilder fields={fields} setOpen={setOpen} />}
          onClose={onCloseHandle}
          maxWidth={'lg'}
        />
      )}
    </Box>
  );
};

export default PageBox;
