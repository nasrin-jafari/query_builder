import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
interface OperatorSelectorProps {
  control: Control<any>;
  name: string;
  operatorOptions: string[];
  onOperatorChange: (newOperator: string) => void;
}
const OperatorSelector: FC<OperatorSelectorProps> = ({
  control,
  name,
  operatorOptions,
  onOperatorChange,
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue="equal"
    render={({ field }) => (
      <FormControl variant="outlined" sx={{ width: '150px', mr: 2 }}>
        <InputLabel>عملگر</InputLabel>
        <Select
          {...field}
          label="Operator"
          onChange={(e) => {
            field.onChange(e.target.value);
            onOperatorChange(e.target.value);
          }}
        >
          {operatorOptions.map((op) => (
            <MenuItem key={op} value={op}>
              {op}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
  />
);

export default OperatorSelector;
