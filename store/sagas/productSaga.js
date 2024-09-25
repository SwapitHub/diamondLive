import { put, takeEvery } from "redux-saga/effects";
import { PRODUCT_LIST, SET_PRODUCT_LIST } from "../constants";
import secureLocalStorage from "react-secure-storage";

const user_id = secureLocalStorage.getItem("formData");

function* getProducts() {
  if (user_id) {
    const response = yield fetch(
      `https://api.rocksama.com/api/v1/wishlist-items?user_id=${user_id}`
    );
    const data = yield response.json();
    console.warn("action is called ", data);
    yield put({ type: SET_PRODUCT_LIST, payload: data });
  }
}

function* productSaga() {
  yield takeEvery(PRODUCT_LIST, getProducts);
}

export default productSaga;
