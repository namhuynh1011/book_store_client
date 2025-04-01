import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./commonSlice";

const store = configureStore({
  reducer: {
    commonSlice: commonReducer,
  },
});

export default store;
