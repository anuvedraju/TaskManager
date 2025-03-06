import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;

      // Save user data to AsyncStorage
      AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
      AsyncStorage.setItem("access_token", action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;

      // Clear AsyncStorage when logging out
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("access_token");
    },
    // setUserFromStorage: (state, action) => {
    //   state.user = action.payload.user;
    //   state.token = action.payload.token;
    // },
  },
});

// Export actions
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;
