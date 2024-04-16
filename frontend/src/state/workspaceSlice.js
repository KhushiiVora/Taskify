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
    lockStateSaved: (state, action) => {
      const workspace = action.payload;
      state.workspaces = state.workspaces.filter(
        (stateWorkspace) => stateWorkspace._id !== workspace._id
      );
      state.workspaces.push(workspace);
    },
    cleared: (state) => {
      state.workspaces = [];
    },
  },
});

export default workspaceSlice.reducer;
export const { saved, restored, lockStateSaved, cleared } =
  workspaceSlice.actions;
