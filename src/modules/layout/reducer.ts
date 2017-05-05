import update from "immutability-helper";

import {
  ACTION_TOOTLE_FILTERS,
  ACTION_TOOTLE_CATALOG,
} from "./constants";

const DEFAULT_LAYOUT = {
  openFilters: false,
  openCatalog: false,
};

const layout = (state = DEFAULT_LAYOUT, action) => {
  switch (action.type) {
    case ACTION_TOOTLE_FILTERS:
      return update(DEFAULT_LAYOUT, {
        openFilters: {$set: !state.openFilters}
      });
    case ACTION_TOOTLE_CATALOG:
      return update(DEFAULT_LAYOUT, {
        openCatalog: {$set: !state.openCatalog}
      });
    default:
      return state;
  }
};

export default layout;
