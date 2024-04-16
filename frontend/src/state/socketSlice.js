import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    saved: (state, action) => {
      state.socket = action.payload;
    },
    cleared: (state) => {
      state.socket = null;
    },
  },
});

export default socketSlice.reducer;
export const { saved, cleared } = socketSlice.actions;
