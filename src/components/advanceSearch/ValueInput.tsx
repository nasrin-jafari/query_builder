import React from 'react';
import { Field } from './SearchQueryBuilder';
import { Box, Checkbox, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { faIR } from 'date-fns-jalali/locale';

interface FieldProps {
  value: string;
  onChange: (value: any) => void;
  onBlur: () => void;
  name: string;
}
interface ValueInputProps {
  field: FieldProps;
  error: any;
  currentOperator: string;
  getFieldLabel: () => string;
  currentFieldData?: Field;
  currentSubFieldData?: Field;
}
const ValueInput: React.FC<ValueInputProps> = ({
  field,
  error,
  currentOperator,
  getFieldLabel,
  currentFieldData,
  currentSubFieldData,
}) => {
  const dataType = currentSubFieldData?.dataType || currentFieldData?.dataType;
  const initialValue = field.value || '';
  const isBetweenOperator = currentOperator === 'between' || currentOperator === 'notBetween';
  if (dataType === 'number' && isBetweenOperator) {
    let minValue, maxValue;
    if (initialValue.includes(',')) {
      [minValue, maxValue] = initialValue.split(',').map((value) => value.trim());
    } else {
      minValue = initialValue;
      maxValue = '';
    }

    const handleChange = (min: string | number, max: string | number) => {
      field.onChange(`${min},${max}`);
    };

    return (
      <Box sx={{ display: 'flex' }}>
        <TextField
          type="number"
          label="از عدد"
          variant="outlined"
          value={minValue}
          onChange={(e) => handleChange(e.target.value, maxValue)}
          error={!!error}
          helperText={error ? error.message : null}
          sx={{
            width: '155px',
            mr: '10px',
            '& .MuiFormHelperText-root': {
              position: 'absolute',
              top: '100%',
              left: 0,
            },
          }}
          FormHelperTextProps={{
            sx: {
              color: error ? 'error.main' : 'text.secondary',
              mt: error ? '3px' : '0',
            },
          }}
        />
        <TextField
          type="number"
          label="تا عدد"
          variant="outlined"
          value={maxValue}
          onChange={(e) => handleChange(minValue, e.target.value)}
          error={!!error}
          helperText={error ? error.message : null}
          sx={{
            width: '155px',
            mr: '10px',
            '& .MuiFormHelperText-root': {
              position: 'absolute',
              top: '100%',
              left: 0,
            },
          }}
          FormHelperTextProps={{
            sx: {
              color: error ? 'error.main' : 'text.secondary',
              mt: error ? '3px' : '0',
            },
          }}
        />
      </Box>
    );
  }

  if (dataType === 'date' && isBetweenOperator) {
    let dateFromString, dateUntilString;
    if (initialValue.includes(',')) {
      [dateFromString, dateUntilString] = initialValue.split(',');
    } else {
      dateFromString = initialValue;
      dateUntilString = '';
    }

    const handleDateChange = (from: Date | null, until: Date | null) => {
      field.onChange(`${from ? from.getTime() / 1000 : ''},${until ? until.getTime() / 1000 : ''}`);
    };

    return (
      <Box sx={{ display: 'flex' }}>
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali} adapterLocale={faIR}>
          <DateTimePicker
            label="از تاریخ"
            timeSteps={{ minutes: 1, seconds: 1 }}
            ampm={false}
            value={dateFromString ? new Date(Number(dateFromString) * 1000) : null}
            onChange={(date) =>
              handleDateChange(
                date,
                dateUntilString ? new Date(Number(dateUntilString) * 1000) : null
              )
            }
            sx={{ width: '280px', mr: 2 }}
            slotProps={{
              textField: {
                variant: 'outlined',
                error: !!error,
                helperText: error ? error.message : null,
                FormHelperTextProps: {
                  sx: {
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                  },
                },
              },
            }}
            views={['year', 'day', 'hours', 'minutes', 'seconds']}
          />
          <DateTimePicker
            label="تا تاریخ"
            timeSteps={{ minutes: 1, seconds: 1 }}
            ampm={false}
            value={dateUntilString ? new Date(Number(dateUntilString) * 1000) : null}
            onChange={(date) =>
              handleDateChange(
                dateFromString ? new Date(Number(dateFromString) * 1000) : null,
                date
              )
            }
            sx={{ width: '280px' }}
            slotProps={{
              textField: {
                variant: 'outlined',
                error: !!error,
                helperText: error ? error.message : null,
                FormHelperTextProps: {
                  sx: {
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                  },
                },
              },
            }}
            views={['year', 'day', 'hours', 'minutes', 'seconds']}
          />
        </LocalizationProvider>
      </Box>
    );
  }

  switch (dataType) {
    case 'number':
      return (
        <TextField
          {...field}
          type="number"
          label="مقدار"
          variant="outlined"
          error={!!error}
          helperText={error ? error.message : null}
          sx={{
            width: '155px',
            mr: '10px',
            '& .MuiFormHelperText-root': {
              position: 'absolute',
              top: '100%',
              left: 0,
            },
          }}
          FormHelperTextProps={{
            sx: {
              color: error ? 'error.main' : 'text.secondary',
              mt: error ? '3px' : '0',
            },
          }}
        />
      );
    case 'checkbox':
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ mr: '4px' }}>{getFieldLabel()}</Typography>
          <Checkbox
            {...field}
            onChange={(e) => field.onChange(e.target.checked)}
            checked={!!field.value}
            defaultChecked
            sx={{
              color: '#e57b2d',
              marginLeft: '-10px',
              '&.Mui-checked': {
                color: '#e57b2d',
              },
            }}
          />
        </Box>
      );
    case 'date':
      return (
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali} adapterLocale={faIR}>
          <DateTimePicker
            timeSteps={{ minutes: 1, seconds: 1 }}
            ampm={false}
            label="تقویم"
            value={field.value ? new Date(Number(field.value) * 1000) : null}
            onChange={(date) => field.onChange(date ? date.getTime() / 1000 : null)}
            slotProps={{
              textField: {
                variant: 'outlined',
                error: !!error,
                helperText: error ? error.message : null,
                FormHelperTextProps: {
                  sx: {
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                  },
                },
              },
            }}
            views={['year', 'day', 'hours', 'minutes', 'seconds']}
            sx={{ width: '280px' }}
          />
        </LocalizationProvider>
      );
    default:
      return (
        <TextField
          {...field}
          type="text"
          label="مقدار"
          variant="outlined"
          error={!!error}
          helperText={error ? error.message : null}
          sx={{
            width: '220px',
            mr: '10px',
            '& .MuiFormHelperText-root': {
              position: 'absolute',
              top: '100%',
              left: 0,
            },
          }}
          FormHelperTextProps={{
            sx: {
              color: error ? 'error.main' : 'text.secondary',
              mt: error ? '3px' : '0',
            },
          }}
        />
      );
  }
};

export default ValueInput;
