import { Control, Controller } from 'react-hook-form';
import { Field } from './CustomForm';
import { Switch } from '@mui/material';

interface CustomSwitchFieldProps {
  field: Field;
  control: Control;
}

const CustomSwitch: React.FC<CustomSwitchFieldProps> = ({ field, control }) => {
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={false}
      render={({ field: { onChange, value } }) => (
        <Switch
          checked={value as boolean}
          onChange={(e) => {
            onChange(e.target.checked);
            if (field.onClick) field.onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
          }}
          color="primary"
        />
      )}
    />
  );
};

export default CustomSwitch;
