import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as auditLogsApi from './auditLogsApi';

export const fetchAuditLogs = createAsyncThunk(
  'auditlogs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await auditLogsApi.getAuditLogs();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const auditLogsSlice = createSlice({
  name: 'auditlogs',
  initialState: {
    logs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditLogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.logs = action.payload;
      })
      .addCase(fetchAuditLogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default auditLogsSlice.reducer;