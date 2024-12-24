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
  EDIT_RESTAURANT_OF_SHOPOWNER_FAILURE,
  GET_SINGLE_RESTAURANT_REQUEST,
  GET_SINGLE_RESTAURANT_SUCCESS,
  GET_SINGLE_RESTAURANT_FAILURE,
  GET_MENUES_OF_RESTAURANT_REQUEST,
  GET_MENUES_OF_RESTAURANT_SUCCESS,
  GET_MENUES_OF_RESTAURANT_FAILURE,
  ADD_NEW_MENU_REQUEST,
  ADD_NEW_MENU_SUCCESS,
  ADD_NEW_MENU_FAILURE,
  UPDATE_MENU_REQUEST,
  UPDATE_MENU_SUCCESS,
  UPDATE_MENU_FAILURE,
  DELETE_MENU_REQUEST,
  DELETE_MENU_SUCCESS,
  DELETE_MENU_FAILURE
} from "./actionTypes";

export const getRestaurantsOfShopowner = (shopownerId, token) => (dispatch) => {

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
      "Content-Type": "multipart/form-data",
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
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    },
    data: payload
  })
    .then(() => {
      return dispatch({
        type: EDIT_RESTAURANT_OF_SHOPOWNER_SUCCESS
      });
    })
    .catch(() => {
      dispatch({ type: EDIT_RESTAURANT_OF_SHOPOWNER_FAILURE });
    });
};

export const getSingleRestaurant = (restId, token) => (dispatch) => {
  dispatch({ type: GET_SINGLE_RESTAURANT_REQUEST });
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/restaurant/get/shop-details/${restId}`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => {
      return dispatch({
        type: GET_SINGLE_RESTAURANT_SUCCESS,
        payload: res?.data?.restaurant
      });
    })
    .catch({ type: GET_SINGLE_RESTAURANT_FAILURE });
};

export const getRestaurantMenus = (restId) => (dispatch) => {
  dispatch({ type: GET_MENUES_OF_RESTAURANT_REQUEST });
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/menu/getMenu/${restId}`)
    .then((res) => {
      return dispatch({
        type: GET_MENUES_OF_RESTAURANT_SUCCESS,
        payload: res?.data?.menuList
      });
    })
    .catch({ type: GET_MENUES_OF_RESTAURANT_FAILURE });
};

export const addNewMenu = (payload, token) => (dispatch) => {
  dispatch({ type: ADD_NEW_MENU_REQUEST });
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/menu/addMenuItems`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(() => {
      return dispatch({ type: ADD_NEW_MENU_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: ADD_NEW_MENU_FAILURE });
    });
};

export const updateMenu = (token, payload, id) => (dispatch) => {
  dispatch({ type: UPDATE_MENU_REQUEST });
  return axios({
    method: "patch",
    url: `${process.env.REACT_APP_BASE_URL}/menu/update/${id}`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => {
      return dispatch({ type: UPDATE_MENU_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: UPDATE_MENU_FAILURE });
    });
};

export const removeMenu = (token, id) => (dispatch) => {
  dispatch({ type: DELETE_MENU_REQUEST });
  return axios({
    method: "patch",
    url: `${process.env.REACT_APP_BASE_URL}/menu/remove/${id}`,
    data: { active: false },
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(() => {
      return dispatch({ type: DELETE_MENU_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: DELETE_MENU_FAILURE });
    });
};
