import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import Uploader from './UploaderFiles';
import { axiosMethod } from '@/api';
import useApi from '@/hooks/UseApi';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

const MultiServices = () => {
  const [selectedModel, setSelectedModel] = useState<string[]>(['multiav']);
  const [showOutput, setShowOutput] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: listModels } = useApi<string[]>('/dashboard/services/');

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedModel(typeof value === 'string' ? value.split(',') : value);
  };

  const uploadFiles = async (files: any) => {
    setLoading(true);

    const formData = new FormData();
    [...files].forEach((file) => {
      formData.append('file', file);
    });
    formData.append('services', selectedModel.join(','));

    try {
      const response = await axiosMethod({
        method: 'POST',
        url: `/dashboard/services/`,
        params: {},
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setData(response?.data?.data);
      setShowOutput(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">انتخاب سرویس کمکی</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedModel}
          onChange={handleChange}
          input={<OutlinedInput label="انتخاب سرویس کمکی" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          sx={{ width: '180px' }}
        >
          {listModels?.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedModel.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
      <Uploader
        setData={setData}
        data={data}
        uploadHandler={uploadFiles}
        showOutput={showOutput}
        setShowOutput={setShowOutput}
        loading={loading}
        singleFile
        renderJsonText
      />
    </Box>
  );
};

export default MultiServices;
