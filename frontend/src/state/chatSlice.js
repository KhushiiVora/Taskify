import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspaceId: null,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    workspaceIdSaved: (state, action) => {
      state.workspaceId = action.payload;
    },
    messageSaved: (state, action) => {
      state.messages.push(action.payload);
    },
    messagesRestored: (state, action) => {
      state.messages = action.payload;
    },
    workspaceIdCleared: (state) => {
      state.workspaceId = null;
    },
    cleared: (state) => {
      state.workspaceId = null;
      state.messages = [];
    },
  },
});

export default chatSlice.reducer;
export const {
  workspaceIdSaved,
  messageSaved,
  messagesRestored,
  workspaceIdCleared,
  cleared,
} = chatSlice.actions;
