import { dashboard } from '@/api/dashboard'; // فرض کنید این یک تابع async thunk است
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface DashboardState {
  isLoading: boolean;
  data: any | null;
  isError: boolean | null;
}

const initialState: DashboardState = {
  isLoading: true,
  data: null,
  isError: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dashboard.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(dashboard.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(dashboard.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default dashboardSlice.reducer;
