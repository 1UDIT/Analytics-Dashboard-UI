import { createSlice } from "@reduxjs/toolkit";

interface DatasetState {
  datasetId: string | null;
}

const initialState: DatasetState = {
  datasetId: sessionStorage.getItem("datasetId"),
};

const datasetSlice = createSlice({
  name: "dataset",
  initialState,
  reducers: {
    setDataset: (state, action) => {
      state.datasetId = action.payload;
      sessionStorage.setItem("datasetId", action.payload);
    },
    clearDataset: (state) => {
      state.datasetId = null;
      sessionStorage.removeItem("datasetId");
    },
  },
});

export const { setDataset, clearDataset } = datasetSlice.actions;
export default datasetSlice.reducer;