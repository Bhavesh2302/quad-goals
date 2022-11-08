
import { applyMiddleware, compose, combineReducers, legacy_createStore } from "redux"
import thunk from "redux-thunk";
import { restaurantReducer } from "../Reducers/RestaurantReducer/restaurantReducer";
import { userReducer } from "../Reducers/UserAuthReducer/userReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    restaurantReducer,
    userReducer
})

export const store = legacy_createStore( rootReducer,  composeEnhancers(applyMiddleware(thunk)))