const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentRole: "ADMIN",
  availableRoles: ["ADMIN", "USER"],
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    changeRole: (state, action) => {
      state.currentRole = action.payload;
    },
  },
});

export const { changeRole } = roleSlice.actions;
export default roleSlice.reducer;
