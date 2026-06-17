import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoginRequest", (state) => { state.isLoading = true; })
    .addCase("LoginSuccess", (state, action) => { state.isLoading = false; state.isAuth = true; state.user = action.payload; })
    .addCase("LoginFailure", (state, action) => { state.isLoading = false; state.isAuth = false; state.error = action.payload; })
    .addCase("RegisterRequest", (state) => { state.isLoading = true; })
    .addCase("RegisterSuccess", (state, action) => { state.isLoading = false; state.user = action.payload; state.isAuth = true; })
    .addCase("RegisterFailure", (state, action) => { state.isLoading = false; state.error = action.payload; state.isAuth = false; })
    .addCase("LoadUserRequest", (state) => { state.isLoading = true; })
    .addCase("LoadUserSuccess", (state, action) => { state.isLoading = false; state.user = action.payload; state.isAuth = true; })
    .addCase("LoadUserFailure", (state, action) => { state.isLoading = false; state.error = action.payload; state.isAuth = false; })
    .addCase("logoutUserRequest", (state) => { state.isLoading = true; })
    .addCase("logoutUserSuccess", (state) => { state.isLoading = false; state.user = null; state.isAuth = false; })
    .addCase("logoutUserFailure", (state, action) => { state.isLoading = false; state.error = action.payload; state.isAuth = true; })
    .addCase("clearErrors", (state) => { state.error = null; });
});

export const postOfFollowingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("postOfFollowingRequest", (state) => { state.isLoading = true; })
    .addCase("postOfFollowingSuccess", (state, action) => { state.isLoading = false; state.posts = action.payload; })
    .addCase("postOfFollowingFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("clearErrors", (state) => { state.error = null; });
});

export const allUsersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("allUsersRequest", (state) => { state.isLoading = true; })
    .addCase("allUsersSuccess", (state, action) => { state.isLoading = false; state.users = action.payload; })
    .addCase("allUsersFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("clearErrors", (state) => { state.error = null; });
});

export const userProfileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("userProfileRequest", (state) => { state.isLoading = true; })
    .addCase("userProfileSuccess", (state, action) => { state.isLoading = false; state.user = action.payload; })
    .addCase("userProfileFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("clearErrors", (state) => { state.error = null; });
});
