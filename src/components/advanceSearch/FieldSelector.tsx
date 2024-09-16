import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Field } from './SearchQueryBuilder';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

interface FieldSelectorProps {
  control: Control<any>;
  name: string;
  fieldOptions: Field[];
  onFieldChange: (newValue: string) => void;
  disableDelete: boolean;
}

const FieldSelector: React.FC<FieldSelectorProps> = ({
  control,
  name,
  fieldOptions,
  onFieldChange,
  disableDelete,
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    render={({ field, fieldState: { error } }) => (
      <FormControl variant="outlined" sx={{ mr: 2, width: 'auto' }} error={!!error}>
        <InputLabel>فیلد</InputLabel>
        <Select
          {...field}
          label="Field"
          disabled={disableDelete}
          onChange={(e) => {
            field.onChange(e);
            onFieldChange(e.target.value);
          }}
          sx={{ width: '220px' }}
        >
          {fieldOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option?.value}
            </MenuItem>
          ))}
        </Select>
        {error && (
          <FormHelperText sx={{ position: 'absolute', top: '100%', left: 0 }}>
            {error.message}
          </FormHelperText>
        )}
      </FormControl>
    )}
  />
);

export default FieldSelector;
