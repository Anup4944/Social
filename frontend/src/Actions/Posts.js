import axios from "axios";

const getErrMsg = (err) =>
  err?.response?.data?.message ?? err?.message ?? "Something went wrong";

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "likeRequest" });
    const { data } = await axios.get(`/api/v1/post/${id}`);
    dispatch({ type: "likeSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "likeFailure", payload: getErrMsg(error) });
  }
};

export const addCommentPostAction = (id, comment) => async (dispatch) => {
  try {
    dispatch({ type: "addCommentRequest" });
    const { data } = await axios.put(
      `/api/v1/post/comment/${id}`,
      { comment },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({ type: "addCommentSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "addCommentFailure", payload: getErrMsg(error) });
  }
};

export const deleteCommentPostAction = (id, commentId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteCommentRequest" });
    const { data } = await axios.delete(`/api/v1/post/comment/${id}`, {
      data: { commentId },
    });
    dispatch({ type: "deleteCommentSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "deleteCommentFailure", payload: getErrMsg(error) });
  }
};

export const createNewPostAction = (caption, image) => async (dispatch) => {
  try {
    dispatch({ type: "newPostRequest" });
    const { data } = await axios.post(
      "/api/v1/post/upload",
      { caption, image },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({ type: "newPostSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "newPostFailure", payload: getErrMsg(error) });
  }
};

export const deletePostAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deletePostRequest" });
    const { data } = await axios.delete(`/api/v1/post/${id}`);
    dispatch({ type: "deletePostSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "deletePostFailure", payload: getErrMsg(error) });
  }
};

export const updatePostAction = (caption, id) => async (dispatch) => {
  try {
    dispatch({ type: "updateCaptionRequest" });
    const { data } = await axios.put(
      `/api/v1/post/${id}`,
      { caption },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({ type: "updateCaptionSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "updateCaptionFailure", payload: getErrMsg(error) });
  }
};
