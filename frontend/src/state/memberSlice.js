import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaders: [],
  members: [],
};

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    membersSaved: (state, action) => {
      state.members.push(action.payload);
    },
    leadersSaved: (state, action) => {
      state.leaders.push(action.payload);
    },
    membersRestored: (state, action) => {
      state.leaders = action.payload.leaders;
      state.members = action.payload.members;
    },
    membersCleared: (state) => {
      state.leaders = null;
      state.members = null;
    },
  },
});

export default memberSlice.reducer;
export const { membersSaved, leadersSaved, membersRestored, membersCleared } =
  memberSlice.actions;
