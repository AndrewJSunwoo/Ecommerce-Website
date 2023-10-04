import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants.js";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // item that is being added
      const item = action.payload;
      // item that exists
      const existItem = state.cartItems.find((x) => x.product === item.product);
      //compare if the item already exits
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        // not changing other properties
        // concatenate card items with the new item
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      //filtering out the product that's id is same as the action.payload
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      //update shipping address to action.payload that contains the data that I set in action
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_EMPTY:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
