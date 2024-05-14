import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Base_url } from "./Constant";

const initialState = {
  user: [],
  party: [],
  election: [],
  connection: [],
  vote: [],
  isLoading: false,
  isError: false,
};

export const fetchData = createAsyncThunk(
  "fetchData",
  async ({ endpoint, dataType }) => {
    try {
      const res = await axios.get(Base_url + endpoint);
      return { data: res.data.data, dataType };
    } catch (err) {
      throw err;
    }
  }
);

export const postData = createAsyncThunk("postData", async (data) => {
  const { endpoint, payload, dataType } = data;
  try {
    const res = await axios.post(Base_url + endpoint, payload);
    return { data: res.data, dataType };
  } catch (err) {
    throw err;
  }
});

export const deleteData = createAsyncThunk("deleteData", async (data) => {
  const { endpoint, id, dataType } = data;
  try {
    await axios.delete(Base_url + endpoint + id);
    return { data: id, dataType };
  } catch (err) {
    throw err;
  }
});

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.endsWith("/pending") ||
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.error
            ? action.error.message
            : "An error occurred";
        }
      )
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, dataType } = action.payload;
        state[dataType] = data;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.isLoading = false;
        const { dataType, data } = action.payload;
        state[dataType] = [...state[dataType], data.data];
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.isLoading = false;
        const { dataType, data } = action.payload;
        state[dataType] = state[dataType].filter((item) => item._id !== data);
      });
  },
});

export default adminSlice.reducer;
