import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspaces: [],
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    saved: (state, action) => {
      state.workspaces.push(action.payload);
    },
    restored: (state, action) => {
      state.workspaces = action.payload;
    },
    cleared: (state) => {
      state.workspaces = [];
    },
  },
});

export default workspaceSlice.reducer;
export const { saved, restored, cleared } = workspaceSlice.actions;
