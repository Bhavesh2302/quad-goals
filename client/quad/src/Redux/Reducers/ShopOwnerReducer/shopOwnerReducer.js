import {
  GET_MENUES_OF_RESTAURANT_FAILURE,
  GET_MENUES_OF_RESTAURANT_REQUEST,
  GET_MENUES_OF_RESTAURANT_SUCCESS,
  GET_RESTAURANTS_OF_SHOPOWNER_FAILURE,
  GET_RESTAURANTS_OF_SHOPOWNER_REQUEST,
  GET_RESTAURANTS_OF_SHOPOWNER_SUCCESS,
  GET_SINGLE_RESTAURANT_FAILURE,
  GET_SINGLE_RESTAURANT_REQUEST,
  GET_SINGLE_RESTAURANT_SUCCESS
} from "./actionTypes";

const initState = {
  restaurants: [],
  orders: [],
  customers: [],
  isLoading: false,
  isError: [],
  restaurantData: {
    isLoading: false,
    isError: false,
    restaurant: {},
    menus: []
  }
};

export const shopOwnerReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_RESTAURANTS_OF_SHOPOWNER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_RESTAURANTS_OF_SHOPOWNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        restaurants: payload
      };
    case GET_RESTAURANTS_OF_SHOPOWNER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        restaurants: []
      };
    case GET_SINGLE_RESTAURANT_REQUEST:
      return {
        ...state,
        restaurantData: {
          ...state.restaurantData,
          isLoading: true
        }
      };
    case GET_SINGLE_RESTAURANT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        restaurantData: {
          ...state.restaurantData,
          restaurant: payload,
          isLoading: false
        }
      };
    case GET_SINGLE_RESTAURANT_FAILURE:
      return {
        ...state,
        restaurantData: {
          ...state.restaurantData,
          isError: true,
          isLoading: false
        }
      };
    case GET_MENUES_OF_RESTAURANT_REQUEST:
      return {
        ...state,
        restaurantData: {
          ...state.restaurantData,
          isLoading: true
        }
      };
    case GET_MENUES_OF_RESTAURANT_SUCCESS:
      return {
        ...state,
        restaurantData: {
          ...state.restaurantData,
          menus: payload,
          isLoading: false
        }
      }
      case GET_MENUES_OF_RESTAURANT_FAILURE:
      return {
        ...state,
        restaurantData: {
          ...state.restaurantData,
          isError: false,
          isLoading: false
        }
      }
    default:
      return state;
  }
};
