import axios from "axios";

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequest" });

    const { data } = await axios.post(
      "https://backendsocialapp.onrender.com/api/v1/login",
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

    const { data } = await axios.get(
      "https://backendsocialapp.onrender.com/api/v1/profile"
    );

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

    const { data } = await axios.get(
      "https://backendsocialapp.onrender.com/api/v1/posts"
    );

    dispatch({ type: "postOfFollowingSuccess", payload: data.posts });
  } catch (error) {
    dispatch({
      type: "postOfFolowingFailure",
      payload: error.response.data.message,
    });
  }
};
export const getAllUsersAction =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "allUsersRequest" });

      const { data } = await axios.get(
        `https://backendsocialapp.onrender.com/api/v1/users?name=${name}`
      );

      dispatch({ type: "allUsersSuccess", payload: data.users });
    } catch (error) {
      dispatch({
        type: "allUsersFailure",
        payload: error.response.data.message,
      });
    }
  };

export const logoutUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutUserRequest" });

    await axios.get("https://backendsocialapp.onrender.com/api/v1/logout");

    dispatch({ type: "logoutUserSuccess" });
  } catch (error) {
    dispatch({
      type: "logoutUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const registerUserAction =
  (name, email, avatar, password) => async (dispatch) => {
    try {
      dispatch({ type: "RegisterRequest" });

      const { data } = await axios.post(
        "https://backendsocialapp.onrender.com/api/v1/register",
        { name, email, avatar, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: "RegisterSuccess", payload: data.user });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

export const updateProfileAction =
  (name, email, avatar) => async (dispatch) => {
    try {
      dispatch({ type: "updateProfileRequest" });

      const { data } = await axios.put(
        "https://backendsocialapp.onrender.com/api/v1/update/profile",
        { name, email, avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: "updateProfileSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "updateProfileFailure",
        payload: error.response.data.message,
      });
    }
  };

export const updatePasswordAction =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "updatePasswordRequest" });

      const { data } = await axios.put(
        "https://backendsocialapp.onrender.com/api/v1/update/password",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: "updatePasswordSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };
export const deleteProfileAction = () => async (dispatch) => {
  try {
    dispatch({ type: "deleteProfileRequest" });

    const { data } = await axios.delete(
      "https://backendsocialapp.onrender.com/api/v1/delete/profile"
    );

    dispatch({ type: "deleteProfileSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgotPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgotPasswordRequest" });

    const { data } = await axios.post(
      "https://backendsocialapp.onrender.com/api/v1/forgot/password",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "forgotPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};
export const resetPasswordAction = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: "resetPasswordRequest" });

    const { data } = await axios.put(
      `https://backendsocialapp.onrender.com/api/v1/password/reset/${token}`,
      { password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "resetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const getMyPostAction = () => async (dispatch) => {
  try {
    dispatch({ type: "myPostsRequest" });

    const { data } = await axios.get(
      "https://backendsocialapp.onrender.com/api/v1/myPost"
    );

    dispatch({ type: "myPostsSuccess", payload: data.posts });
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response.data.message,
    });
  }
};
export const getUserPostAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "userPostsRequest" });

    const { data } = await axios.get(
      `https://backendsocialapp.onrender.com/api/v1/usersposts/${id}`
    );

    dispatch({ type: "userPostsSuccess", payload: data.posts });
  } catch (error) {
    dispatch({
      type: "userPostsFailure",
      payload: error.response.data.message,
    });
  }
};
export const getUserProfileAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "userProfileRequest" });

    const { data } = await axios.get(
      `https://backendsocialapp.onrender.com/api/v1/user/${id}`
    );

    dispatch({ type: "userProfileSuccess", payload: data.user });
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const followAndUnfollowAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "followUserRequest" });

    const { data } = await axios.get(
      `https://backendsocialapp.onrender.com/api/v1/follow/${id}`
    );

    dispatch({ type: "followUserSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      payload: error.response.data.message,
    });
  }
};
