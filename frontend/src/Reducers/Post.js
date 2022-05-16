import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const likeReducer = createReducer(initialState, {
  likeRequest: (state) => {
    state.isLoading = true;
  },
  likeSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  likeFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  addCommentRequest: (state) => {
    state.isLoading = true;
  },
  addCommentSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  addCommentFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  deleteCommentRequest: (state) => {
    state.isLoading = true;
  },
  deleteCommentSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteCommentFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const myPostReducer = createReducer(initialState, {
  myPostsRequest: (state) => {
    state.isLoading = true;
  },
  myPostsSuccess: (state, action) => {
    state.isLoading = false;
    state.posts = action.payload;
  },
  myPostsFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
