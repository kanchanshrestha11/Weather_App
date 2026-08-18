import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getWeatherByCity,
  getWeatherByLocation,
} from "../../services/weatherApi";

function getSavedFavorites() {
  try {
    return JSON.parse(localStorage.getItem("weatherFavorites")) || [];
  } catch {
    return [];
  }
}

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      return await getWeatherByCity(city);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchLocalWeather = createAsyncThunk(
  "weather/fetchLocalWeather",
  async ({ latitude, longitude }, { rejectWithValue }) => {
    try {
      return await getWeatherByLocation(latitude, longitude);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    status: "idle",
    error: null,
    favorites: getSavedFavorites(),
  },
  reducers: {
    toggleFavorite(state, action) {
      const city = action.payload;
      const alreadySaved = state.favorites.some(
        (favorite) => favorite.id === city.id,
      );

      if (alreadySaved) {
        state.favorites = state.favorites.filter(
          (favorite) => favorite.id !== city.id,
        );
      } else {
        state.favorites.push(city);
      }

      localStorage.setItem(
        "weatherFavorites",
        JSON.stringify(state.favorites),
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong.";
      })
      .addCase(fetchLocalWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLocalWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchLocalWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unable to use your location.";
      });
  },
});

export const { toggleFavorite } = weatherSlice.actions;
export default weatherSlice.reducer;
