import { Control, Controller } from 'react-hook-form';
import { Field } from './SearchQueryBuilder';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

interface SubFieldSelectorProps {
  control: Control<any>;
  name: string;
  subFieldOptions: Field[];
}

export const SubFieldSelector: React.FC<SubFieldSelectorProps> = ({
  control,
  name,
  subFieldOptions,
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    render={({ field, fieldState: { error } }) => (
      <FormControl variant="outlined" sx={{ mr: 2, width: 'auto' }} error={!!error}>
        <InputLabel> فیلد فرعی</InputLabel>
        <Select
          {...field}
          label="Sub Field"
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
          sx={{ width: '220px' }}
        >
          {subFieldOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
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
