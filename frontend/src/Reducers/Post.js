import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const likeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("likeRequest", (state) => { state.isLoading = true; })
    .addCase("likeSuccess", (state, action) => { state.isLoading = false; state.message = action.payload; })
    .addCase("likeFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("addCommentRequest", (state) => { state.isLoading = true; })
    .addCase("addCommentSuccess", (state, action) => { state.isLoading = false; state.message = action.payload; })
    .addCase("addCommentFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("deleteCommentRequest", (state) => { state.isLoading = true; })
    .addCase("deleteCommentSuccess", (state, action) => { state.isLoading = false; state.message = action.payload; })
    .addCase("deleteCommentFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("newPostRequest", (state) => { state.isLoading = true; })
    .addCase("newPostSuccess", (state, action) => { state.isLoading = false; state.message = action.payload; })
    .addCase("newPostFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("updateCaptionRequest", (state) => { state.isLoading = true; })
    .addCase("updateCaptionSuccess", (state, action) => { state.isLoading = false; state.message = action.payload; })
    .addCase("updateCaptionFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("deletePostRequest", (state) => { state.isLoading = true; })
    .addCase("deletePostSuccess", (state, action) => { state.isLoading = false; state.message = action.payload; })
    .addCase("deletePostFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("updateProfileRequest", (state) => { state.isLoading = true; })
    .addCase("updateProfileSuccess", (state, action) => { state.isLoading = false; state.message = action.payload; })
    .addCase("updateProfileFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("updatePasswordRequest", (state) => { state.isLoading = true; })
    .addCase("updatePasswordSuccess", (state, action) => { state.isLoading = false; state.message = action.payload; })
    .addCase("updatePasswordFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("deleteProfileRequest", (state) => { state.isLoading = true; })
    .addCase("deleteProfileSuccess", (state, action) => { state.isLoading = false; state.message = action.payload; })
    .addCase("deleteProfileFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("forgotPasswordRequest", (state) => { state.isLoading = true; })
    .addCase("forgotPasswordSuccess", (state, action) => { state.isLoading = false; state.message = action.payload; })
    .addCase("forgotPasswordFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("followUserRequest", (state) => { state.isLoading = true; })
    .addCase("followUserSuccess", (state, action) => { state.isLoading = false; state.message = action.payload; })
    .addCase("followUserFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("resetPasswordRequest", (state) => { state.isLoading = true; })
    .addCase("resetPasswordSuccess", (state, action) => { state.isLoading = false; state.message = action.payload; })
    .addCase("resetPasswordFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("clearErrors", (state) => { state.error = null; })
    .addCase("clearMessage", (state) => { state.message = null; });
});

export const myPostReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("myPostsRequest", (state) => { state.isLoading = true; })
    .addCase("myPostsSuccess", (state, action) => { state.isLoading = false; state.posts = action.payload; })
    .addCase("myPostsFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("clearErrors", (state) => { state.error = null; });
});

export const userPostReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("userPostsRequest", (state) => { state.isLoading = true; })
    .addCase("userPostsSuccess", (state, action) => { state.isLoading = false; state.posts = action.payload; })
    .addCase("userPostsFailure", (state, action) => { state.isLoading = false; state.error = action.payload; })
    .addCase("clearErrors", (state) => { state.error = null; });
});
