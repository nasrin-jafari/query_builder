import { IconButton } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { IoMdClose } from 'react-icons/io';
import { Field } from './CustomForm';
import { Control, Controller } from 'react-hook-form';

interface CustomDatePickerProps {
  field: Field;
  control: Control;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ field, control }) => {
  return (
    <div dir="rtl" style={{ position: 'relative' }}>
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        <Controller
          name={field.name}
          control={control}
          render={({ field }) => (
            <div>
              <DateTimePicker
                {...field}
                timeSteps={{ minutes: 1, seconds: 1 }}
                ampm={false}
                label="تقویم"
                views={['year', 'day', 'hours', 'minutes', 'seconds']}
                defaultValue={new Date()}
                onChange={(date) => {
                  const formattedDate = date ? new Date(date).getTime() / 1000 : null;
                  field.onChange(formattedDate);
                }}
                value={field.value ? new Date(field.value * 1000) : null}
              />
              {field.value ? (
                <div style={{ position: 'absolute', top: ' 15%', left: ' 10%' }}>
                  <IconButton onClick={() => field.onChange(null)}>
                    <IoMdClose />
                  </IconButton>
                </div>
              ) : null}
            </div>
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;
