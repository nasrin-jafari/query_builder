import { javascript } from '@codemirror/lang-javascript';
import ReactCodeMirror from '@uiw/react-codemirror';
import { Control, Controller } from 'react-hook-form';
import { Field } from './CustomForm';
import React from 'react';

interface CustomCodeMirrorProps {
  field: Field;
  control: Control;
}

const CustomCodeMirror: React.FC<CustomCodeMirrorProps> = ({ field, control }) => {
  return (
    <div style={{ direction: 'ltr' }}>
      <Controller
        name={field.name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <ReactCodeMirror
            value={value}
            height="200px"
            width="100%"
            theme="dark"
            extensions={[javascript({ jsx: true })]}
            onChange={(value) => onChange(value)}
          />
        )}
      />
    </div>
  );
};

export default CustomCodeMirror;
