import { FETCH_PRODUCTS, ADD_DATABASE, DELETE_DATABASE } from './actionTypes';

const initialState = {
  products: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case ADD_DATABASE:
      console.log(Object.assign([], action.payload))
      return {
        ...state,
        products: Object.assign([], action.payload)
      };
    case DELETE_DATABASE:
      console.log(Object.assign([], action.payload))
      return {
        ...state,
        products: Object.assign([], action.payload)
      };
    default:
      return state;
  }
}
