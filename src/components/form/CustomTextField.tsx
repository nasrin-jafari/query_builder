import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { Field } from './CustomForm';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface CustomTextFieldProps {
  field: Field;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ field }) => {
  const [showPassword, setShowPassword] = useState(false);

  const methods = useFormContext();
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (field.type === 'number' && (event.key === 'e' || event.key === 'E' || event.key === '.')) {
      event.preventDefault();
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <TextField
      autoComplete={field.type === 'password' ? 'new-password' : 'off'}
      onKeyDown={handleKeyDown}
      fullWidth
      type={field.type === 'password' ? (showPassword ? 'text' : 'password') : field.type}
      variant="outlined"
      {...methods.register(field.name as keyof FieldValues, {
        valueAsNumber: field.type === 'number',
      })}
      InputProps={{
        ...(field.type === 'password' && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePasswordVisibility}>
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </IconButton>
            </InputAdornment>
          ),
        }),
        // ...(field.disabled && {
        //   disabled: true,
        // }),
      }}
      error={!!methods.formState.errors[field.name]}
      helperText={
        methods.formState.errors[field.name]
          ? String(methods.formState.errors[field.name]?.message)
          : ''
      }
    />
  );
};

export default CustomTextField;
