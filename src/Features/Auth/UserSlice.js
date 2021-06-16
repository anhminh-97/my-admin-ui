import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "Api/UserApi";
import { storageKeys } from "Constants/CommonConstants";

export const register = createAsyncThunk("user/register", async (payload) => {
  const data = await UserApi.register(payload);
  // save data to local storage
  // localStorage.setItem(storageKeys.TOKEN, data.jwt);
  // localStorage.setItem(storageKeys.EMAIL, JSON.stringify(data.email));

  return data.email;
});
export const login = createAsyncThunk("user/login", async (payload) => {
  const data = await UserApi.login(payload);
  // save data to local storage
  localStorage.setItem(storageKeys.TOKEN, data.jwt);
  localStorage.setItem(storageKeys.USER, JSON.stringify(data.user));

  return data.user;
});

const UserSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(storageKeys.USER)) || {},
    loading: false,
    errorMessage: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem(storageKeys.USER);
      localStorage.removeItem(storageKeys.TOKEN);

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
