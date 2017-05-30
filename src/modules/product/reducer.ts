import update from "immutability-helper";
import {ACTION_SELECT_SUBPRODUCT, ACTION_SELECT_COLOR} from "./constants";

const DEFAULT_PRODUCT = {
  subProductId: null,
  colorId: null
};

const product = (state = DEFAULT_PRODUCT, action) => {
  switch (action.type) {
    case ACTION_SELECT_SUBPRODUCT:
      return update(DEFAULT_PRODUCT, {
        subProductId: {$set: action.subProductId}
      });

    case ACTION_SELECT_COLOR:
      return update(DEFAULT_PRODUCT, {
        colorId: {$set: action.colorId}
      });
    default:
      return state;
  }
};

export default product;

// componentWillReceiveProps(nextProps) {
//   const { data } = this.props;
//   const {loading, product } = data;
//   if(loading === false && this.props.product.subProductId === null) {
//     const {subProducts} = product;
//     const subProductId = subProducts[0].id;
//     this.props.dispatch({type: ACTION_SELECT_SUBPRODUCT, subProductId: subProductId})
//   }
// }
