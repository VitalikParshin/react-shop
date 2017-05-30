import update from "immutability-helper";
import {ACTION_ADD_VIEWED_PRODUCT} from "./constants";

const DEFAULT_CATALOG = {
  viewedProductIds: [String],
};

const catalog = (state = DEFAULT_CATALOG, action) => {
  const {productId} = action;
  switch (action.type) {
    case ACTION_ADD_VIEWED_PRODUCT:
      if (state.viewedProductIds.indexOf(productId) == -1) {
        return update(state, {
          viewedProductIds: {$push: [productId]}
        });
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default catalog;
