import { GET_RESTAURANTS_DATA_FAILURE, GET_RESTAURANTS_DATA_REQUEST, GET_RESTAURANTS_DATA_SUCCESS } from "./actionTypes"

const initState = {
    allRestaurants: [],
    isLoading: false,
    isError: false
} 


export const restaurantReducer = (state = initState, { type , payload })=>{
    
      switch(type){
         case GET_RESTAURANTS_DATA_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
         }
         case GET_RESTAURANTS_DATA_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                allRestaurants: payload
            }
         }

         case GET_RESTAURANTS_DATA_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
         }

         default: return state
         
      }
}