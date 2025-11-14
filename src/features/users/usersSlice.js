import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as usersApi from './usersApi';

export const fetchUsers = createAsyncThunk('users/fetchAll', async (role = 'CITIZEN') => (await usersApi.getUsers(role)).data);
export const changeUserRole = createAsyncThunk('users/changeRole', async ({ id, role }) => (await usersApi.updateUserRole(id, role)).data);
export const banUser = createAsyncThunk('users/ban', async (id) => (await usersApi.deleteUser(id)).data);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        const index = state.list.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        console.log(action.payload)
      })
      .addCase(banUser.fulfilled, (state, action) => {
        state.list = state.list.filter(user => user.id !== action.meta.arg);
      });
  },
});

export default usersSlice.reducer;