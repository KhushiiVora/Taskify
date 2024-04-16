import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaders: [],
  members: [],
};

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    memberSaved: (state, action) => {
      state.members.push(action.payload);
    },
    leaderSaved: (state, action) => {
      state.leaders.push(action.payload);
    },
    restored: (state, action) => {
      state.leaders = action.payload.leaders;
      state.members = action.payload.members;
    },
    cleared: (state) => {
      state.leaders = [];
      state.members = [];
    },
  },
});

export default memberSlice.reducer;
export const { memberSaved, leaderSaved, restored, cleared } =
  memberSlice.actions;
