import { configureStore } from '@reduxjs/toolkit';
import caseReducer from './casesSlice';

export const store = configureStore({
  reducer: {
    cases: caseReducer,
    // Add other slices here as the app grows
  },
});

// These two lines are CRITICAL for the hooks file above
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;