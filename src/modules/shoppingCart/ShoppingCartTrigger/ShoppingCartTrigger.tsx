import * as React from "react";
import { Button, Icon } from "antd-mobile";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { ACTION_TOOTLE_FILTERS } from "../../layout/constants";

class ShoppingCartTrigger extends React.Component<any,any> {

  onClick = () => {
    this.props.dispatch({type: ACTION_TOOTLE_FILTERS})
  }

  render() {
    return (
      <div>
        <Icon style={{padding: 15}} type={require("!svg-sprite!./cart.svg")}/>
      </div>
    )
  }
}

const mapStateToProps: any = (state) => ({
})

export default compose(
    connect<any, {}, any>(mapStateToProps),
)(ShoppingCartTrigger);
