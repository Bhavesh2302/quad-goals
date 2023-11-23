import {
  REST_OWNER_SIGNUP_FAILURE,
  REST_OWNER_SIGNUP_REQUEST,
  REST_OWNER_SIGNUP_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_SUCCESS
} from "./actionTypes";
import axios from "axios";

export const userSignup = (payload) => (dispatch) => {
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/signup`,
    method: "post",
    data: payload,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(() => {
      return dispatch({ type: USER_SIGNUP_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: USER_SIGNUP_FAILURE });
      console.log(error);
    });
};

export const restOwnerSignup = (payload) => (dispatch) => {
  dispatch({ type: REST_OWNER_SIGNUP_REQUEST });
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/signup`,
    method: "post",
    data: payload,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(() => {
      return dispatch({ type: REST_OWNER_SIGNUP_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: REST_OWNER_SIGNUP_FAILURE });
      console.log(error);
    });
};

export const userLogin = (payload) => (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/login`,
    method: "post",
    data: payload,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      if (res.data.msg === "Login Successful") {
        return dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: { token: res.data.token, user: res.data.user }
        });
      } else return dispatch({ type: USER_LOGIN_FAILURE });
    })
    .catch((error) => {
      dispatch({ type: USER_LOGIN_FAILURE });
      console.log(error);
    });
};

export const userLogout = () => (dispatch) => {
  return dispatch({ type: USER_LOGOUT });
};
