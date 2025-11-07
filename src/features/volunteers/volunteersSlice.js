import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as volunteersApi from './volunteersApi';

export const getVolunteerStats = createAsyncThunk('volunteers/getStats', async () => (await volunteersApi.getStats()).data);
export const fetchVolunteers = createAsyncThunk('volunteers/fetchAll', async (params) => {
 const response= await volunteersApi.getVolunteers(params);
 console.log(response)
 return response.data
});
export const fetchVolunteerProfile = createAsyncThunk('volunteers/fetchOne', async (id) => (await volunteersApi.getVolunteerById(id)).data);
export const fetchVolunteers1 = createAsyncThunk('volunteers1/fetchAll', async () => (await volunteersApi.getVolunteers1()).data);

// New async thunk for incident history
export const fetchIncidentHistory = createAsyncThunk('volunteers/fetchHistory', async (volunteerId) => {
    const response = await volunteersApi.getIncidentHistory(volunteerId);
    return response.data;
});

const volunteersSlice = createSlice({
  name: 'volunteers',
  initialState: {
    list: [],
    currentProfile: null,
    incidentHistory: [], // New state for history
    volunteerStats: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    // Add a reducer to clear the profile when leaving the page
    clearCurrentProfile: (state) => {
        state.currentProfile = null;
        state.incidentHistory = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVolunteers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status= 'succeeded'
        state.list = action.payload || []; 
      })
      .addCase(fetchVolunteers1.fulfilled, (state, action) => {
        state.status= 'succeeded'
        state.list = action.payload;
      })
      .addCase(fetchVolunteerProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVolunteerProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentProfile = action.payload;
      })
      .addCase(fetchIncidentHistory.fulfilled, (state, action) => {
        state.incidentHistory = action.payload;
      });
  },
});

export const { clearCurrentProfile } = volunteersSlice.actions;
export default volunteersSlice.reducer;