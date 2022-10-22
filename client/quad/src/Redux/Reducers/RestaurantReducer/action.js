import { GET_RESTAURANTS_DATA_FAILURE, GET_RESTAURANTS_DATA_REQUEST, GET_RESTAURANTS_DATA_SUCCESS } from "./actionTypes"



export const getAllRestaurants = ()=>(dispatch)=>{
      
    dispatch({ type: GET_RESTAURANTS_DATA_REQUEST})
    axios.get("")
    .then((res)=>{
        console.log("all restaurants", res.data)
        dispatch({ type: GET_RESTAURANTS_DATA_SUCCESS, payload: res.data})
    })
    .catch((error)=>{
        dispatch({ type: GET_RESTAURANTS_DATA_FAILURE})
    })
}