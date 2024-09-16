import { MenuItem, Select } from '@mui/material';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { Field } from './CustomForm';

interface CustomSelectFieldProps {
  field: Field;
  control: Control;
  onChange?: (value: string | number) => void; // اضافه کردن onChange به Props
}

const CustomSelectField: React.FC<CustomSelectFieldProps> = ({ field, control, onChange }) => {
  const methods = useFormContext();
  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange: fieldOnChange, ...fieldProps } }) => (
        <Select
          {...fieldProps}
          multiple={field.multiple ? true : false}
          fullWidth
          size="small"
          error={!!methods.formState.errors[field.name]}
          onChange={(e) => {
            fieldOnChange(e.target.value);
            if (onChange) onChange(e.target.value); // فراخوانی تابع onChange
          }}
          value={fieldProps.value || []}
        >
          {field.options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};

export default CustomSelectField;
