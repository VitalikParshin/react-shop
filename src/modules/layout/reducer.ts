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
      return {
        openFilters: !state.openFilters
      };
    case ACTION_TOOTLE_CATALOG:
      return {
        openCatalog: !state.openCatalog
      };
    default:
      return state;
  }
};

export default layout;
