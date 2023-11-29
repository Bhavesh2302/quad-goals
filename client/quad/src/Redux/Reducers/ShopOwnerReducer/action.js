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
  DELETE_RESTAURANT_OF_SHOPOWNER_FAILURE
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

export const addRestaurantOfShopOwner = (payload,token) => (dispatch) => {
  dispatch({type:ADD_RESTAURANT_OF_SHOPOWNER_REQUEST})
  axios({
    url: `${process.env.REACT_APP_BASE_URL}/restaurant/create`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    data:payload
  })
  .then((res) => {
    return   dispatch({
      type:ADD_RESTAURANT_OF_SHOPOWNER_SUCCESS,
    })
  })
  .catch(()=> {
    dispatch({type:ADD_RESTAURANT_OF_SHOPOWNER_FAILURE})
  })
}


export const deleteRestaurantOfShopOwner = (restaurantId,token) => (dispatch) => {
   dispatch({type:DELETE_RESTAURANT_OF_SHOPOWNER_REQUEST})
   axios({
    url: `${process.env.REACT_APP_BASE_URL}/restaurant/remove/${restaurantId}`,
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
   })
   .then((res) => {
    return dispatch({
      type:DELETE_RESTAURANT_OF_SHOPOWNER_SUCCESS
    })
   })
   .catch(()=>{
    dispatch({type:DELETE_RESTAURANT_OF_SHOPOWNER_FAILURE})
   })
}
