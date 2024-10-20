import { axiosMethod } from '@/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const dashboard = createAsyncThunk('dashboard', async () => {
  try {
    const response = await axiosMethod.get('/dashboard/');
    return response?.data?.data;
  } catch (err) {
    return false;
  }
});
