import update from "immutability-helper";

import {
  ACTION_TOOTLE_FILTERS,

  ACTION_ENABLE_CATALOG,
  ACTION_DISABLE_CATALOG,
  ACTION_TOOTLE_CATALOG,

  ACTION_TOOTLE_MENU,
  ACTION_ENABLE_MENU,
  ACTION_DISABLE_MENU,

  ACTION_RESET,
} from "./constants";

const DEFAULT_LAYOUT = {
  openFilters: false,
  openCatalog: false,
  openMenu: false,
};

const layout = (state = DEFAULT_LAYOUT, action) => {
  switch (action.type) {
    case ACTION_TOOTLE_FILTERS:
      return update(DEFAULT_LAYOUT, {
        openFilters: {$set: !state.openFilters}
      });

    case ACTION_DISABLE_CATALOG:
      return update(DEFAULT_LAYOUT, {
        openCatalog: {$set: false}
      });
    case ACTION_ENABLE_CATALOG:
      return update(DEFAULT_LAYOUT, {
        openCatalog: {$set: true}
      });
    case ACTION_TOOTLE_CATALOG:
      return update(DEFAULT_LAYOUT, {
        openCatalog: {$set: !state.openCatalog}
      });

    case ACTION_DISABLE_MENU:
      return update(DEFAULT_LAYOUT, {
        openMenu: {$set: false}
      });
    case ACTION_ENABLE_MENU:
      return update(DEFAULT_LAYOUT, {
        openMenu: {$set: true}
      });
    case ACTION_TOOTLE_MENU:
      return update(DEFAULT_LAYOUT, {
        openMenu: {$set: !state.openMenu}
      });

    case ACTION_RESET:
      return Object.assign({}, DEFAULT_LAYOUT)
    default:
      return state;
  }
};

export default layout;
