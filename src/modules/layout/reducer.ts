import { ACTION_TOOTLE_FILTERS } from "./constants";

const DEFAULT_LAYOUT = {
  openFilters: false,
};

const layout = (state = DEFAULT_LAYOUT, action) => {
  switch (action.type) {
    case ACTION_TOOTLE_FILTERS:
      return {
        openFilters: !state.openFilters
      };
    default:
      return state;
  }
};

export default layout;
