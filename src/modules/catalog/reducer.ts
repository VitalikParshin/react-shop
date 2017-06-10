import update from "immutability-helper";
import {ACTION_ADD_VIEWED_PRODUCT, ACTION_TOGGLE_SHOW_ONLY_VIEWED} from "./constants";
import {ICatalog} from "./model";

const DEFAULT_CATALOG: ICatalog = {
  showOnlyViewed: false,
  viewedProductIds: [],
};

const catalog = (state = DEFAULT_CATALOG, action) => {
  const {productId} = action;
  switch (action.type) {
    case ACTION_ADD_VIEWED_PRODUCT:
      if (state.viewedProductIds.indexOf(productId) === -1) {
        return update(state, {
          viewedProductIds: {$push: [productId]},
        });
      } else {
        return state;
      }
    case ACTION_TOGGLE_SHOW_ONLY_VIEWED:
      return update(state, {
        showOnlyViewed: {$set: !state.showOnlyViewed},
      });
    default:
      return state;
  }
};

export default catalog;
