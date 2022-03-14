import { createSlice } from "@reduxjs/toolkit";

export const serverSlice = createSlice({
  name: "server",
  initialState: {
    server_id: null,
  },
  reducers: {
    changeserver_id: (state, action) => {
      state.server_id = action.payload;
    },
  },
});

export const { changeserver_id } = serverSlice.actions;
export const selectserver_id = (state) => state.server.server_id;

export default serverSlice.reducer;
