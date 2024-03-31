import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    socketSaved: (state, action) => {
      state.socket = action.payload;
    },
    socketCleared: (state) => {
      state.socket = null;
    },
  },
});

export default socketSlice.reducer;
export const { socketSaved, socketCleared } = socketSlice.actions;
