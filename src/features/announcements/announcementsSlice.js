import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as announcementsApi from './announcementsApi';

export const fetchAnnouncements = createAsyncThunk(
  'announcements/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await announcementsApi.getAnnouncements();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewAnnouncement = createAsyncThunk(
  'announcements/create',
  async (announcementData, { dispatch, rejectWithValue }) => {
    try {
      await announcementsApi.createAnnouncement(announcementData);
      // After successfully creating, re-fetch the list to show the new one.
      dispatch(fetchAnnouncements());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(createNewAnnouncement.rejected, (state, action) => {
        // Handle creation-specific errors if needed
        state.error = action.payload.message || 'Failed to create announcement.';
      });
  },
});

export default announcementsSlice.reducer;