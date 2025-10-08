import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Import all your reducers
import authReducer from '../features/auth/authSlice';
import incidentsReducer from '../features/incidents/incidentsSlice';
import volunteersReducer from '../features/volunteers/volunteersSlice';
import usersReducer from '../features/users/usersSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import announcementsReducer from '../features/announcements/announcementsSlice';
import auditLogsReducer from '../features/auditlogs/auditLogsSlice';

// --- Configuration for redux-persist ---
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // Whitelist: only the 'auth' slice will be persisted.
  whitelist: ['auth'] 
};

// Combine all your reducers into a single rootReducer
const rootReducer = combineReducers({
  auth: authReducer,
  incidents: incidentsReducer,
  volunteers: volunteersReducer,
  users: usersReducer,
  dashboard: dashboardReducer,
  announcements: announcementsReducer,
  auditlogs: auditLogsReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // This is required to avoid warnings with non-serializable data in redux-persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor object
export const persistor = persistStore(store);