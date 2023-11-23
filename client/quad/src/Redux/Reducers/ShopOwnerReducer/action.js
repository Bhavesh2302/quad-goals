import axios from "axios";
import {
  GET_RESTAURANTS_OF_SHOPOWNER_FAILURE,
  GET_RESTAURANTS_OF_SHOPOWNER_REQUEST,
  GET_RESTAURANTS_OF_SHOPOWNER_SUCCESS
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
