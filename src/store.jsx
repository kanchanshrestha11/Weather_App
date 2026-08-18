import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import weatherReducer from "./features/weather/weatherSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    weather: weatherReducer,
  },
});
export default store;
