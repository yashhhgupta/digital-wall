import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./board-slice";
import postSlice from "./post-slice";

const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
    post: postSlice.reducer,
  },
});
export default store;
