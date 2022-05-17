import axios from "axios";

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequest" });

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "LoginSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "LoginFailure", payload: error.response.data.message });
  }
};
export const loadUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get("/api/v1/profile");

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({ type: "LoadUserFailure", payload: error.response.data.message });
  }
};

export const getFollowingPostAction = () => async (dispatch) => {
  try {
    dispatch({ type: "postOfFollowingRequest" });

    const { data } = await axios.get("/api/v1/posts");

    dispatch({ type: "postOfFollowingSuccess", payload: data.posts });
  } catch (error) {
    dispatch({
      type: "postOfFolowingFailure",
      payload: error.response.data.message,
    });
  }
};
export const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch({ type: "allUsersRequest" });

    const { data } = await axios.get("/api/v1/users");

    dispatch({ type: "allUsersSuccess", payload: data.users });
  } catch (error) {
    dispatch({
      type: "allUsersFailure",
      payload: error.response.data.message,
    });
  }
};

export const getMyPostAction = () => async (dispatch) => {
  try {
    dispatch({ type: "myPostsRequest" });

    const { data } = await axios.get("/api/v1/myPost");

    dispatch({ type: "myPostsSuccess", payload: data.posts });
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response.data.message,
    });
  }
};
export const logoutUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutUserRequest" });

    await axios.get("/api/v1/logout");

    dispatch({ type: "logoutUserSuccess" });
  } catch (error) {
    dispatch({
      type: "logoutUserFailure",
      payload: error.response.data.message,
    });
  }
};
