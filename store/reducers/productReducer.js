import { SET_PRODUCT_LIST } from '../constants';

const productDataWishlist = (state = [], action) => {
    switch (action.type) {
        case SET_PRODUCT_LIST:
            console.warn("product list condition ", action.payload.data);
            return action.payload.data;
        default:
            return state;
    }
};

export default productDataWishlist;
