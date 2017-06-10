import * as React from "react";

import { Button } from "antd-mobile";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { ACTION_TOOTLE_SHOPPING_CART } from "../../layout/constants";

class ShoppingCart extends React.Component<any, any> {

  public onClick = () => {
    this.props.dispatch({type: ACTION_TOOTLE_SHOPPING_CART});
  }

  public render() {
    return (
      <h1>КОРЗИНА</h1>
    );
  }
}

const mapStateToProps: any = (state) => ({
});

export default compose(
    connect<any, {}, any>(mapStateToProps),
)(ShoppingCart);
