import * as React from "react";
import { Button, Icon } from "antd-mobile";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { ACTION_TOOTLE_FILTERS } from "../../layout/constants";
import Ripples from "react-ripples";
import {ILayout} from "../../layout/model";

interface ShoppingCartTriggerProps {
  layout: ILayout,
  dispatch: any,
}


class ShoppingCartTrigger extends React.Component<ShoppingCartTriggerProps,any> {

  onClick = () => {
    this.props.dispatch({type: ACTION_TOOTLE_FILTERS})
  }

  render() {
    const { layout } = this.props;
    return (
      <Ripples>
        <Icon
          type={require("!svg-sprite!./cart.svg")}
          size="md"
          onClick={this.onClick}
          style={{
            fill: layout.openShoppingCart ? "orange" : "white",
            padding: 20,
          }}
        />
      </Ripples>
    )
  }
}

const mapStateToProps: any = (state) => ({
  layout: state.layout,
})

export default compose(
    connect<any, {}, any>(mapStateToProps),
)(ShoppingCartTrigger);
