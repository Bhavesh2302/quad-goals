import { loadData, saveData } from "../../../Utilities/LocalStorage"
import { USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "./actionTypes"

const initState = {
    isAuth: loadData("rest_token") ? true : false,
    token: loadData("rest_token") || null,
    userData: {},
    isLoading: false,
    isError: false
}

export const userReducer = ( state = initState , { type, payload })=>{
     
     switch(type){
        
        case USER_LOGIN_REQUEST:{
            return{
                ...state,
                isLoading: true
            }
        }
        case USER_LOGIN_SUCCESS:{
            saveData("rest_token", payload)
            return{
                ...state,
                isLoading: false,
                token: payload,
            }
        }
        case USER_LOGIN_FAILURE:{
            saveData("rest_token", null)
            return{
                ...state,
                isLoading: false,
                token: null
            }
        }
        case USER_LOGOUT:{
            saveData("rest_token", null)
            return{
                ...state,
                isLoading: false,
                token: null
            }
        }

        default: return state
     }
}