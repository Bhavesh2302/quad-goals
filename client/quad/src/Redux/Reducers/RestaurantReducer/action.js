import axios from "axios";
import {
    GET_RESTAURANTS_BY_CITY_FAILURE,
    GET_RESTAURANTS_BY_CITY_REQUEST,
  GET_RESTAURANTS_BY_CITY_SUCCESS,
  GET_RESTAURANTS_DATA_FAILURE,
  GET_RESTAURANTS_DATA_REQUEST,
  GET_RESTAURANTS_DATA_SUCCESS,
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

export const getRestaurantsByCity = (city,sortBy) => (dispatch) => {
console.log(sortBy)
    dispatch({type:GET_RESTAURANTS_BY_CITY_REQUEST})
  return axios.get(`http://localhost:7082/allRestaurants/getCity?city=${city}&sortBy=${sortBy}`)
    .then((res) => {
      console.log(res);
     return dispatch({type:GET_RESTAURANTS_BY_CITY_SUCCESS,payload:res.data.Restaurants})
    })
    .catch((error) => {
        dispatch({type:GET_RESTAURANTS_BY_CITY_FAILURE})
      console.log(error);
    });
};


// const getResturantLowToHigh = () =>(dispatch) =>{


// }

// const getResturantHighToLow = () =>(dispatch) =>{


// }