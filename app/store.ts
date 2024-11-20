// src/store.ts (or store.js if using JavaScript)
import { configureStore } from '@reduxjs/toolkit';
// Import your reducers (slices)
import authReducer from './features/auth/authSlice'; // Example auth slice





// Configure the Redux store
const store = configureStore(
    {
  reducer: {
    auth: authReducer, // Add more reducers here as you create them
  },
}
);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
