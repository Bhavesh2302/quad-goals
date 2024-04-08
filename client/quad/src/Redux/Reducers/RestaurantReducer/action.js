import axios from "axios";
import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  DELETE_ITEM_CART_FAILURE,
  DELETE_ITEM_CART_REQUEST,
  DELETE_ITEM_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_MENU_DATA_FAILURE,
  GET_MENU_DATA_REQUEST,
  GET_MENU_DATA_SUCCESS,
  GET_RESTAURANTS_BY_CITY_FAILURE,
  GET_RESTAURANTS_BY_CITY_REQUEST,
  GET_RESTAURANTS_BY_CITY_SUCCESS,
  GET_RESTAURANTS_DATA_FAILURE,
  GET_RESTAURANTS_DATA_REQUEST,
  GET_RESTAURANTS_DATA_SUCCESS,
  GET_RESTAURANTS_FAILURE,
  GET_RESTAURANTS_REQUEST,
  GET_RESTAURANTS_SUCCESS,
  GET_SINGLE_RESTAURANT_NAME_FAILURE,
  GET_SINGLE_RESTAURANT_NAME_REQUEST,
  GET_SINGLE_RESTAURANT_NAME_SUCCESS,
  UPDATE_ITEM_CART_FAILURE,
  UPDATE_ITEM_CART_REQUEST,
  UPDATE_ITEM_CART_SUCCESS
} from "./actionTypes";

// export const getAllRestaurants = () => (dispatch) => {
//   dispatch({ type: GET_RESTAURANTS_DATA_REQUEST });
//   axios
//     .get("")
//     .then((res) => {
//       console.log("all restaurants", res.data);
//       dispatch({ type: GET_RESTAURANTS_DATA_SUCCESS, payload: res.data });
//     })
//     .catch((error) => {
//       dispatch({ type: GET_RESTAURANTS_DATA_FAILURE });
//     });
// };

export const getRestaurantsByCity = (city) => (dispatch) => {
  // console.log(sortBy)
  dispatch({ type: GET_RESTAURANTS_BY_CITY_REQUEST });
  return axios
    .get(
      `${process.env.REACT_APP_BASE_URL}/allRestaurants/getCity?city=${city}`
    )
    .then((res) => {
      // console.log("city",res);
      return dispatch({
        type: GET_RESTAURANTS_BY_CITY_SUCCESS,
        payload: res.data.Restaurants
      });
    })
    .catch((error) => {
      dispatch({ type: GET_RESTAURANTS_BY_CITY_FAILURE });
      console.log(error);
    });
};

export const getRestaurants = (city, sortBy) => (dispatch) => {
  dispatch({ type: GET_RESTAURANTS_REQUEST });
  return axios
    .get(
      `${process.env.REACT_APP_BASE_URL}/allRestaurants/getCity?city=${city}&sortBy=${sortBy}`
    )
    .then((res) => {
      // console.log(res.data.Restaurants);
      return dispatch({
        type: GET_RESTAURANTS_SUCCESS,
        payload: res.data.Restaurants
      });
    })
    .catch((error) => {
      dispatch({ type: GET_RESTAURANTS_FAILURE });
      console.log(error);
    });
};

// fetch(`${process.env.REACT_APP_BASE_URL}/menu/getMenu/${restId}`,{
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//          "Authorization": `Bearer ${token}`,
//         }
//       })
//         .then((res) => res.json())
//         .then((res) => {
//           console.log("menu", res);
//         });
// /restaurant/get
export const singleRestaurant = (restId) => (dispatch) => {
  dispatch({ type: GET_MENU_DATA_REQUEST });
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/menu/getMenu/${restId}`)
    .then((res) => {
      // console.log(res)
      return dispatch({ type: GET_MENU_DATA_SUCCESS, payload: res.data });
    })
    .catch({ type: GET_MENU_DATA_FAILURE });
};

export const singleRestaurantName = (restId) => (dispatch) => {
  dispatch({ type: GET_SINGLE_RESTAURANT_NAME_REQUEST });
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/restaurant/get/${restId}`)
    .then((res) => {
      // console.log(res)
      return dispatch({
        type: GET_SINGLE_RESTAURANT_NAME_SUCCESS,
        payload: res.data
      });
    })
    .catch({ type: GET_SINGLE_RESTAURANT_NAME_FAILURE });
};

//  *****  Get cart ******

export const getCart = (token) => (dispatch) => {
  // console.log("getdata");

  dispatch({ type: GET_CART_REQUEST });
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/cart/get`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => {
      // console.log("get", res);
      return dispatch({ type: GET_CART_SUCCESS, payload: res.data.cartData });
    })
    .catch((err) => {
      dispatch({ type: GET_CART_FAILURE });
    });
};

//  *****  Add To cart ******

export const addToCart = (token, menuId) => (dispatch) => {
  // console.log(token)
  dispatch({ type: ADD_TO_CART_REQUEST });
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/cart/add/${menuId}`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => {
      return dispatch({ type: ADD_TO_CART_SUCCESS });
      // getCart()
    })
    .catch((err) => {
      dispatch({ type: ADD_TO_CART_FAILURE });
    });
};

// **********    Delete Cart  *******

export const deleteFromCart = (token, cartId) => (dispatch) => {
  dispatch({ type: DELETE_ITEM_CART_REQUEST });
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/cart/delete/${cartId}`,
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => {
      // console.log(res);
      return dispatch({ type: DELETE_ITEM_CART_SUCCESS });
      // dispatch(getCart())
    })
    .catch((err) => {
      dispatch({ type: DELETE_ITEM_CART_FAILURE });
    });
};

//  **** update quantity in the cart

export const updateQuantity = (token, cartId, payload) => (dispatch) => {
  // console.log(token)
  dispatch({ type: UPDATE_ITEM_CART_REQUEST });
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/cart/${cartId}`,
    method: "patch",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Access-Control-Allow-Origin": "http://localhost:3000"
    },
    data: JSON.stringify(payload)
  })
    .then((res) => {
      // console.log("patch", res);
      return dispatch({ type: UPDATE_ITEM_CART_SUCCESS });
      // getCart()
    })
    .catch((err) => {
      dispatch({ type: UPDATE_ITEM_CART_FAILURE });
    });
};

// http://localhost:7082/cart/637df58a62d4aa32d7691d32/-1
