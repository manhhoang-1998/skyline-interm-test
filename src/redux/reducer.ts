import { combineReducers } from "@reduxjs/toolkit";
import { loadingReducer } from "./slice/loadingSlice";
import { themeReducer } from "./slice/themeSlice";

export const rootReducer = combineReducers({
  theme: themeReducer,
  loading: loadingReducer,
});
