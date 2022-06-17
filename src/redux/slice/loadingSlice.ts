import { createSlice } from "@reduxjs/toolkit";

const initialState = false;
const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, actions) => actions.payload,
  },
});

export const loadingAction = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
