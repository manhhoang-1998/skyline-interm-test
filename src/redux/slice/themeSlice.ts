import { createSlice, Dispatch } from "@reduxjs/toolkit";

const initialState = true;
const themeSlice = createSlice({
  name: "themes",
  initialState,
  reducers: {
    setTheme: (state) => !state,
  },
});

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;

export const onChangeTheme = (dispatch: Dispatch, theme: boolean) => {
  const themeStyle = theme ? "light" : "dark";
  dispatch(themeActions.setTheme());
  localStorage.setItem("theme", themeStyle);
};
