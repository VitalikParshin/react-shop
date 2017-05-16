import * as React from "react";
import {Button, Icon, Flex} from "antd-mobile";
import {compose} from "react-apollo";
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
  router: any;
  dispatch: any;
  height: number;
}

class MenuTrigger extends React.Component<MenuTriggerProps,any> {

  onClick = (e) => {
    e.preventDefault();
    this.props.dispatch({type: ACTION_RESET});
  }

  render() {
    const { router, height } = this.props;
    return (
      <Ripples onClick={this.onClick}>
        <Link to="/">
          <Flex align="center" style={{color: "white", padding: `0 ${height/3}px`, height: height}}>
            BUY
            <Icon
              type={require("!svg-sprite!./packet_filled.svg")}
              size="md"
              style={{
                fill: router.location.pathname === "/" ? "orange" : "white",
                margin: "0px 10px 15px 10px",
              }}
            />
            BAG
          </Flex>
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
