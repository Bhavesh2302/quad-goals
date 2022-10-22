
import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import thunk from "redux-thunk";
import { restaurantReducer } from "../Reducers/RestaurantReducer/restaurantReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    restaurantReducer
})

export const store = legacy_createStore( rootReducer,  composeEnhancers(applyMiddleware(thunk)))