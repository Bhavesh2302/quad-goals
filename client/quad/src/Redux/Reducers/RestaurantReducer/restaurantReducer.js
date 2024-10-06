import {
  GET_CART_SUCCESS,
  GET_RESTAURANTS_BY_CITY_FAILURE,
  GET_RESTAURANTS_BY_CITY_REQUEST,
  GET_RESTAURANTS_BY_CITY_SUCCESS,
  GET_RESTAURANTS_FAILURE,
  GET_RESTAURANTS_REQUEST,
  GET_RESTAURANTS_SUCCESS,
  INITIAL_GET_RESTAURANTS_BY_CITY_FAILURE,
  INITIAL_GET_RESTAURANTS_BY_CITY_REQUEST,
  INITIAL_GET_RESTAURANTS_BY_CITY_SUCCESS
} from "./actionTypes";

const initState = {
  allRestaurantsByCity: [],
  allRestaurants: [],
  cart: [],
  isLoading: false,
  isError: false,
  initialLoading: false
};

export const restaurantReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_RESTAURANTS_BY_CITY_REQUEST: {
      return {
        ...state,
        isLoading: true,
        initialLoading: false
      };
    }
    case GET_RESTAURANTS_BY_CITY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        allRestaurantsByCity: payload,
        initialLoading: false
      };
    }

    case GET_RESTAURANTS_BY_CITY_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        initialLoading: false
      };
    }

    case GET_RESTAURANTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        initialLoading: false
      };
    }

    case GET_RESTAURANTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        allRestaurants: payload,
        initialLoading: false
      };
    }

    case GET_RESTAURANTS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        initialLoading: false
      };
    }

    case GET_CART_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        cart: payload,
        initialLoading: false
      };
    }
    case INITIAL_GET_RESTAURANTS_BY_CITY_REQUEST:
      return {
        ...state,
        isLoading: false,
        initialLoading: true
      };
    case INITIAL_GET_RESTAURANTS_BY_CITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        initialLoading: false
      };
    case INITIAL_GET_RESTAURANTS_BY_CITY_FAILURE:
      return {
        ...state,
        isLoading: false,
        initialLoading: false
      };
    default:
      return state;
  }
};
