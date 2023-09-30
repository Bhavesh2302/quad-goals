import { loadData, saveData } from "../../../Utilities/LocalStorage"
import { USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "./actionTypes"

const initState = loadData("rest_token") || {
    isAuth:false,
    token:  null,
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
            saveData("rest_token", { token : payload.token, userData : payload.user})
            return{
                ...state,
                isLoading: false,
                token: payload.token,
                userData : payload.user
            }
        }
        case USER_LOGIN_FAILURE:{
            saveData("rest_token", { token : null, userData : {}})
            return{
                ...state,
                isLoading: false,
                token: null,
                userData : {}
            }
        }
        case USER_LOGOUT:{
            saveData("rest_token", { token : null, userData : {}})
            return{
                ...state,
                isLoading: false,
                token: null
            }
        }

        default: return state
     }
}