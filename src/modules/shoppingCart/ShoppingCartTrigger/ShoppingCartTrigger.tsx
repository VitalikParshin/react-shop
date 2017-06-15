import * as React from "react";

import { Button, Icon } from "antd-mobile";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import Ripples from "react-ripples";
import { ACTION_TOOTLE_FILTERS } from "../../layout/constants";
import {ILayout} from "../../layout/model";

interface IConnectedShoppingCartTriggerProps {
  layout: ILayout;
  dispatch: any;
}

interface IShoppingCartTriggerProps {
  height: number;
}

class ShoppingCartTrigger extends React.Component<IConnectedShoppingCartTriggerProps & IShoppingCartTriggerProps, any> {

  public onClick = () => {
    this.props.dispatch({type: ACTION_TOOTLE_FILTERS});
  }

  public render() {
    const { layout, height } = this.props;
    return (
      <Ripples>
        <Icon
          type={require("!svg-sprite!./cart.svg")}
          size="md"
          onClick={this.onClick}
          style={{
            fill: layout.openShoppingCart ? "orange" : "white",
            // tslint:disable-next-line:object-literal-shorthand
            height: height,
            padding: `0 ${height / 3}px`,
          }}
        />
      </Ripples>
    );
  }
}

const mapStateToProps: any = (state) => ({
  layout: state.layout,
});

export default compose(
  connect<IConnectedShoppingCartTriggerProps, {}, IShoppingCartTriggerProps>(mapStateToProps),
)(ShoppingCartTrigger);
