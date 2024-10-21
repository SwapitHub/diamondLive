import { put, takeEvery } from "redux-saga/effects";
import { PRODUCT_LIST_CART, SET_CART_LIST } from "../constants";
import secureLocalStorage from "react-secure-storage";

const user_id = secureLocalStorage.getItem("formData");

function* getProducts() {
  if (user_id) {
    try {
      const response = yield fetch(
        `https://api.rocksama.com/api/v1/getcart-items?user_id=${user_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const data = yield response.json();
      console.warn("cart action is called ", data);
      yield put({ type: SET_CART_LIST, payload: data });
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }
}

function* productSagaCart() {
  yield takeEvery(PRODUCT_LIST_CART, getProducts);
}

export default productSagaCart;
