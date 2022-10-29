// import { USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "./actionTypes"

// const initState = {
//     userData: {},
//     isLoading: false,
//     isError: false
// }

// export const userReducer = ( state = initState , { type, payload })=>{
     
//      switch(type){
        
//         case USER_SIGNUP_REQUEST:{
//             return{
//                 ...state,
//                 isLoading: true
//             }
//         }
//         case USER_SIGNUP_SUCCESS:{
//             return{
//                 ...state,
//                 isLoading: false,
//                 userData: payload,
//             }
//         }
//         case USER_SIGNUP_REQUEST:{
//             return{
//                 ...state,
//                 isLoading: false,
//             }
//         }
//      }
// }