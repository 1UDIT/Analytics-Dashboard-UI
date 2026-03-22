import { configureStore } from "@reduxjs/toolkit"; 
import datasetReducer from "./slices/datasetSlice";

export const store = configureStore({
  reducer: { 
    dataset: datasetReducer,
  },
});

// types (important for TS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;