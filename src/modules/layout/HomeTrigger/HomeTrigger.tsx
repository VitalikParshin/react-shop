import * as React from "react";
import { Button, Icon } from "antd-mobile";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import {
ACTION_TOOTLE_MENU,
ACTION_RESET
}
from "../../layout/constants";
import {ILayout} from "../model";
import Ripples from "react-ripples";
import {Link} from "react-router-dom";

interface MenuTriggerProps {
  router: any,
  dispatch: any,
}

class MenuTrigger extends React.Component<MenuTriggerProps,any> {

  onClick = (e) => {
    e.preventDefault();
    this.props.dispatch({type: ACTION_RESET});
  }

  render() {
    const { router } = this.props;
    return (
      <Ripples
        onClick={this.onClick}
      >
        <Link to="/">
          <Icon
            type={require("!svg-sprite!./home.svg")}
            size="md"
            style={{
              fill: router.location.pathname === "/" ? "orange" : "white",
              padding: 15,
            }}
          />
        </Link>
      </Ripples>
    )
  }
}

const mapStateToProps: any = (state) => ({
  layout: state.layout,
  router: state.router,
})

export default compose(
    connect<any, {}, any>(mapStateToProps),
)(MenuTrigger);
