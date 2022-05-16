import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const likeReducer = createReducer(initialState, {
  likeRequest: (state, action) => {
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
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.mesage = null;
  },
});
