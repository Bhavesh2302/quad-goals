import axios from "axios";
import {
  GET_RESTAURANTS_OF_SHOPOWNER_FAILURE,
  GET_RESTAURANTS_OF_SHOPOWNER_REQUEST,
  GET_RESTAURANTS_OF_SHOPOWNER_SUCCESS,
  ADD_RESTAURANT_OF_SHOPOWNER_REQUEST,
  ADD_RESTAURANT_OF_SHOPOWNER_SUCCESS,
  ADD_RESTAURANT_OF_SHOPOWNER_FAILURE,
  DELETE_RESTAURANT_OF_SHOPOWNER_REQUEST,
  DELETE_RESTAURANT_OF_SHOPOWNER_SUCCESS,
  DELETE_RESTAURANT_OF_SHOPOWNER_FAILURE,
  EDIT_RESTAURANT_OF_SHOPOWNER_REQUEST,
  EDIT_RESTAURANT_OF_SHOPOWNER_SUCCESS,
  EDIT_RESTAURANT_OF_SHOPOWNER_FAILURE
} from "./actionTypes";

export const getRestaurantsOfShopowner = (shopownerId, token) => (dispatch) => {
  console.log(shopownerId, token);

  dispatch({ type: GET_RESTAURANTS_OF_SHOPOWNER_REQUEST });
  axios({
    url: `${process.env.REACT_APP_BASE_URL}/restaurant/get/shops/${shopownerId}`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_RESTAURANTS_OF_SHOPOWNER_SUCCESS,
        payload: res.data.restaurants
      });
    })
    .catch(() => {
      dispatch({ type: GET_RESTAURANTS_OF_SHOPOWNER_FAILURE });
    });
};

export const addRestaurantOfShopOwner = (payload, token) => (dispatch) => {
  dispatch({ type: ADD_RESTAURANT_OF_SHOPOWNER_REQUEST });
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/restaurant/create`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    data: payload
  })
    .then((res) => {
      return dispatch({
        type: ADD_RESTAURANT_OF_SHOPOWNER_SUCCESS
      });
    })
    .catch(() => {
      dispatch({ type: ADD_RESTAURANT_OF_SHOPOWNER_FAILURE });
    });
};

export const deleteRestaurantOfShopOwner =
  (restaurantId, token) => (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_OF_SHOPOWNER_REQUEST });
    return axios({
      url: `${process.env.REACT_APP_BASE_URL}/restaurant/remove/${restaurantId}`,
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      data: { active: false }
    })
      .then(() => {
        return dispatch({
          type: DELETE_RESTAURANT_OF_SHOPOWNER_SUCCESS
        });
      })
      .catch(() => {
        dispatch({ type: DELETE_RESTAURANT_OF_SHOPOWNER_FAILURE });
      });
  };

export const editRestaurantOfShopOwner = (payload, token, id) => (dispatch) => {
  dispatch({ type: EDIT_RESTAURANT_OF_SHOPOWNER_REQUEST });
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/restaurant/update/${id}`,
    method: "patch",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    data: payload
  })
    .then((res) => {
      return dispatch({
        type: EDIT_RESTAURANT_OF_SHOPOWNER_SUCCESS
      });
    })
    .catch(() => {
      dispatch({ type: EDIT_RESTAURANT_OF_SHOPOWNER_FAILURE });
    });
};
