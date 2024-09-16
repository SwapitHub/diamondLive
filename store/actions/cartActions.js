import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_COUNT,
  REMOVE_CART_COUNT,
  SET_CART_DETAILS,
  SET_WISHLIST_DETAILS,
} from "../constants";

export const addToCart = (data) => {
  console.warn("action is called", data);
  return {
    type: ADD_TO_CART,
    payload: data,
  };
};

export const removeFromCart = (data) => {
  console.warn("action removeFromCart", data);
  return {
    type: REMOVE_FROM_CART,
    payload: data,
  };
};

export const updateCartCount = (payload) => {
  return {
    type: UPDATE_CART_COUNT,
    payload,
  };
};

export const removeCartCount = (payload) => {
  return {
    type: REMOVE_CART_COUNT,
    payload,
  };
};
export const setCartDetails = (cartDetails) => {
  return {
    type: SET_CART_DETAILS,
    payload: cartDetails,
  };
};

export const setWishlistDetails = (wishlistDetails) => {
  return {
    type: SET_WISHLIST_DETAILS,
    payload: wishlistDetails,
  };
};
