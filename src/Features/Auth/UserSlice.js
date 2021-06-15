import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "Api/UserApi";

export const register = createAsyncThunk("user/register", async (payload) => {
  const data = await UserApi.register(payload);
  // save data to local storage
  // localStorage.setItem(storageKeys.TOKEN, data.jwt);
  // localStorage.setItem(storageKeys.EMAIL, JSON.stringify(data.email));

  return data.email;
});
export const login = createAsyncThunk("user/login", async (value) => {
  const data = await UserApi.login(value);
  // save data to local storage
  localStorage.setItem("auth", JSON.stringify(data));

  return data;
});

const UserSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem("auth")) || {},
    loading: false,
    errorMessage: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("auth");
      state.current = {};
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
      state.loading = false;
    },
    [register.rejected]: (state) => {
      state.loading = false;
    },
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
      state.loading = false;
    },
    [login.rejected]: (state) => {
      state.loading = false;
    },
  },
});

const { actions, reducer } = UserSlice;
export const { logout } = actions;
export default reducer;
