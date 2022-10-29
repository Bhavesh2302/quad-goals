import { USER_SIGNUP_FAILURE, USER_SIGNUP_SUCCESS } from "./actionTypes"
import axios from "axios"

export const userSignup = (payload)=>(dispatch)=>{
   
    return axios({
        url:"http://localhost:7000/signup",
        method:"post",
        data: payload,
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res)=>{
        console.log(res.data)
       return dispatch({ type: USER_SIGNUP_SUCCESS})
    })
    .catch((error)=>{
        dispatch({ type : USER_SIGNUP_FAILURE})
        console.log(error)
    })
}