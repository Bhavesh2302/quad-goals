import {
  GET_RESTAURANTS_OF_SHOPOWNER_FAILURE,
  GET_RESTAURANTS_OF_SHOPOWNER_REQUEST,
  GET_RESTAURANTS_OF_SHOPOWNER_SUCCESS
} from "./actionTypes";

const initState = {
  restaurants: [],
  orders: [],
  customers: [],
  isLoading: false,
  isError: []
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
    default:
      return state;
  }
};
