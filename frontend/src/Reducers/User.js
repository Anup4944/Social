import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  isAuth: false,
};

export const userReducer = createReducer(initialState, {
  reducer: {
    loginRequest: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },

    registerRequest: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },

    loadUserRequest: (state) => {
      state.isLoading = true;
    },
    loadUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
    loadUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
  },
});
