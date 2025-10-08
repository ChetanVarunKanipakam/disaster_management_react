import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as incidentsApi from './incidentsApi';

// Async thunks for each API call
export const getIncidentStats = createAsyncThunk('incidents/getStats', async () => (await incidentsApi.getStats()).data);
export const getRecentIncidents = createAsyncThunk('incidents/getRecent', async () => (await incidentsApi.getRecent()).data);
export const fetchIncidents = createAsyncThunk('incidents/fetchAll', async (params) => (await incidentsApi.getIncidents(params)).data);
export const fetchIncidentDetails = createAsyncThunk('incidents/fetchOne', async (id) => (await incidentsApi.getIncidentById(id)).data);

// ... (imports and thunks are the same)

const incidentsSlice = createSlice({
  name: 'incidents',
  initialState: {
    list: [],
    currentIncident: null,
    incidentStats: {},
    recentIncidents: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearCurrentIncident: (state) => {
      state.currentIncident = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIncidentStats.fulfilled, (state, action) => {
        state.status = 'succeeded'; // <-- ADD THIS
        state.incidentStats = action.payload;
      })
      .addCase(getRecentIncidents.fulfilled, (state, action) => {
        state.status = 'succeeded'; // <-- ADD THIS
        state.recentIncidents = action.payload;
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        state.status = 'succeeded'; // <-- ADD THIS
        state.list = action.payload;
      })
      .addCase(fetchIncidentDetails.fulfilled, (state, action) => {
        state.status = 'succeeded'; // <-- THIS IS THE KEY FIX
        state.currentIncident = action.payload;
      })
      // Matchers for pending and rejected
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
          state.error = null; // Also good to clear old errors
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          // Use action.payload if you use rejectWithValue, otherwise action.error.message
          state.error = action.payload || action.error.message;
        }
      );
  },
});
export const { clearCurrentIncident } = incidentsSlice.actions;
export default incidentsSlice.reducer;