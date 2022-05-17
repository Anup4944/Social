import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

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
  logoutUserRequest: (state) => {
    state.isLoading = true;
  },
  logoutUserSuccess: (state) => {
    state.isLoading = false;
    state.user = null;
    state.isAuth = false;
  },
  logoutUserFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isAuth = true;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});

export const postOfFollowingReducer = createReducer(initialState, {
  postOfFollowingRequest: (state) => {
    state.isLoading = true;
  },
  postOfFollowingSuccess: (state, action) => {
    state.isLoading = false;
    state.posts = action.payload;
  },
  postOfFollowingFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const allUsersReducer = createReducer(initialState, {
  allUsersRequest: (state) => {
    state.isLoading = true;
  },
  allUsersSuccess: (state, action) => {
    state.isLoading = false;
    state.users = action.payload;
  },
  allUsersFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
