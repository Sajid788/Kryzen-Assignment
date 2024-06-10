import axios from "axios";
import { LOGIN, LOGIN_ERROR, LOGIN_REQUEST, LOGOUT } from "./types";

export const LogIn = (creds) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });

  try {
    const { data } = await axios.post(
      `http://localhost:8080/user/login`,
      creds
    );
    console.log(data);
    return dispatch({
      type: LOGIN,
      payload: data.token,
      token: localStorage.setItem("userToken", data.token),
    });
  } catch ({
    response: {
      data: { message },
    },
  }) {
    console.log(message);
    return dispatch({
      type: LOGIN_ERROR,
      payload: message,
    });
  }
};

export const LogOut = () => ({ type: LOGOUT });
