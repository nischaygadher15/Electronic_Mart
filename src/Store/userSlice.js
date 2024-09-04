import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  activeUser: {},
};

let userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    ACTIVE_USER: (state, action) => {
      state.activeUser = { ...action.payload };
      // sessionStorage.setItem("activeUser", JSON.stringify(action.payload));
    },
  },
});

export const { ACTIVE_USER } = userSlice.actions;
export const selectUser = (state) => state.user.activeUser;
export default userSlice;
