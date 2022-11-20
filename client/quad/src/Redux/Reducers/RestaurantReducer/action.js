import axios from "axios";
import {
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

export const getRestaurantsByCity = (city,) => (dispatch) => {
// console.log(sortBy)
    dispatch({type:GET_RESTAURANTS_BY_CITY_REQUEST})
  return axios.get(`http://localhost:7082/allRestaurants/getCity?city=${city}`)
    .then((res) => {
      // console.log("city",res);
     return dispatch({type:GET_RESTAURANTS_BY_CITY_SUCCESS,payload:res.data.Restaurants})
    })
    .catch((error) => {
        dispatch({type:GET_RESTAURANTS_BY_CITY_FAILURE})
      console.log(error);
    });
};


export const getRestaurants = (city,sortBy,deliveryTime) =>(dispatch)=>{
  console.log(deliveryTime)
  dispatch({type:GET_RESTAURANTS_REQUEST})
return axios.get(`http://localhost:7082/allRestaurants/getCity?city=${city}&sortBy=${sortBy}&deliveryTime=${deliveryTime}`)
  .then((res) => {
    console.log(res.data.Restaurants);
   return dispatch({type:GET_RESTAURANTS_SUCCESS,payload:res.data.Restaurants})
  })
  .catch((error) => {
      dispatch({type:GET_RESTAURANTS_FAILURE})
    console.log(error);
  });
}


// fetch(`http://localhost:7082/menu/getMenu/${restId}`,{
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

export const singleRestaurant = (restId)=>(dispatch) =>{
 
  dispatch({type:GET_MENU_DATA_REQUEST})
  return axios.get(`http://localhost:7082/menu/getMenu/${restId}`)
  .then((res)=>{
    console.log(res)
    return dispatch({type:GET_MENU_DATA_SUCCESS,payload:res.data})

  })
  .catch({type:GET_MENU_DATA_FAILURE})
}