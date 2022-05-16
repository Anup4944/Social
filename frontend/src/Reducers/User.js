import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  isAuth: false,
  isLoading: false,
  user: {},
};

export const userReducer = createReducer(initialState, {
  LoginRequest: (state) => {
    state.isLoading = true;
  },
  LoginSuccess: (state, action) => {
    state.isLoading = false;
    state.isAuth = true;
    state.user = action.payload;
  },
  LoginFailure: (state, action) => {
    state.isLoading = false;
    state.isAuth = false;
    state.error = action.payload;
  },

  RegisterRequest: (state) => {
    state.isLoading = true;
  },
  RegisterSuccess: (state, action) => {
    state.isLoading = false;
    state.user = action.payload;
    state.isAuth = true;
  },
  RegisterFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isAuth = false;
  },

  LoadUserRequest: (state) => {
    state.isLoading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isLoading = false;
    state.user = action.payload;
    state.isAuth = true;
  },
  LoadUserFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isAuth = false;
  },
});
