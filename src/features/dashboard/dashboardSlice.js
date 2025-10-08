import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as dashboardApi from './dashboardApi';

// Create thunks for each API call
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getDashboardStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchIncidentsReport = createAsyncThunk(
  'dashboard/fetchIncidentsReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getIncidentsReport();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchResponseTimesReport = createAsyncThunk(
  'dashboard/fetchResponseTimesReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getResponseTimesReport();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchHotspotsReport = createAsyncThunk(
  'dashboard/fetchHotspotsReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getHotspotsReport();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: {
      incidentCounts: [],
      incidentStatusCounts: [],
      activeVolunteers: 0,
      recentIncidents: []
    },
    incidentsReport: [],
    responseTimes: {},
    hotspots: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the combined stats endpoint
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.status = 'succeeded';
      })
      // Handle individual report endpoints
      .addCase(fetchIncidentsReport.fulfilled, (state, action) => {
        state.incidentsReport = action.payload;
      })
      .addCase(fetchResponseTimesReport.fulfilled, (state, action) => {
        state.responseTimes = action.payload;
      })
      .addCase(fetchHotspotsReport.fulfilled, (state, action) => {
        state.hotspots = action.payload;
      })
      // Generic pending and rejected handlers
      .addMatcher(
        (action) => action.type.startsWith('dashboard/') && action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('dashboard/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload.message || 'Failed to fetch dashboard data';
        }
      );
  },
});

export default dashboardSlice.reducer;