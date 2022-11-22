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

let token = JSON.parse(localStorage.getItem("rest_token"))
    // console.log(token)

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


export const getRestaurants = (city,sortBy) =>(dispatch)=>{
  dispatch({type:GET_RESTAURANTS_REQUEST})
return axios.get(`http://localhost:7082/allRestaurants/getCity?city=${city}&sortBy=${sortBy}`)
  .then((res) => {
    // console.log(res.data.Restaurants);
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
// /restaurant/get
export const singleRestaurant = (restId)=>(dispatch) =>{
 
  dispatch({type:GET_MENU_DATA_REQUEST})
  return axios.get(`http://localhost:7082/menu/getMenu/${restId}`)
  .then((res)=>{
    console.log(res)
    return dispatch({type:GET_MENU_DATA_SUCCESS,payload:res.data})

  })
  .catch({type:GET_MENU_DATA_FAILURE})
}

export const singleRestaurantName = (restId)=>(dispatch) =>{
 
  dispatch({type:GET_SINGLE_RESTAURANT_NAME_REQUEST})
  return axios.get(`http://localhost:7082/restaurant/get/${restId}`)
  .then((res)=>{
    console.log(res)
    return dispatch({type:GET_SINGLE_RESTAURANT_NAME_SUCCESS,payload:res.data})

  })
  .catch({type:GET_SINGLE_RESTAURANT_NAME_FAILURE})
}


//  *****  Get cart ******

export const getCart = ()=> (dispatch) =>{

  console.log("getdata")

   dispatch({type : GET_CART_REQUEST})
  return axios({
    url:`http://localhost:7082/cart/get`,
    method:"get",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
  })
  .then((res)=>{
    console.log("get" ,res)
   return dispatch({type :GET_CART_SUCCESS ,payload : res.data.cartData})
  })
  .catch((err)=>{
    dispatch({type :GET_CART_FAILURE})
  })

}




//  *****  Add To cart ******


export const addToCart = (menuId)=>(dispatch) =>{
  console.log(token)
  dispatch({type :ADD_TO_CART_REQUEST})
  return axios({
    url:`http://localhost:7082/cart/add/${menuId}`,
    method:"post",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
  }).then((res)=>{
    return dispatch({type : ADD_TO_CART_SUCCESS})
    // getCart()
  })
  .catch((err)=>{
    dispatch({type : ADD_TO_CART_FAILURE})
  })

}

export const deleteFromCart = (cartId)=>(dispatch) =>{
  dispatch({type :DELETE_ITEM_CART_REQUEST})
  return axios({
    url:`http://localhost:7082/cart/delete/${cartId}`,
    method:"delete",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
  }).then((res)=>{
    console.log(res)
   return dispatch({type : DELETE_ITEM_CART_SUCCESS})
    // dispatch(getCart())
  })
  .catch((err)=>{
    dispatch({type : DELETE_ITEM_CART_FAILURE})
  })

}

