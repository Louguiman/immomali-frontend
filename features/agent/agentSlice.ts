import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  category: "",
  city: "",
  listen: "",
  length: 0,
  page: 1, // Current page
  pageSize: 6, // Agents per page
};

export const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    addName: (state, action) => {
      state.name = action.payload;
    },
    addCategory: (state, action) => {
      state.category = action.payload;
    },
    addCity: (state, action) => {
      state.city = action.payload;
    },
    addListen: (state, action) => {
      state.listen = action.payload;
    },
    addAgentItemLength: (state, action) => {
      state.length = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export const {
  addName,
  addCategory,
  addCity,
  addListen,
  addAgentItemLength,
  setPage,
  setPageSize,
} = agentSlice.actions;
export default agentSlice.reducer;
