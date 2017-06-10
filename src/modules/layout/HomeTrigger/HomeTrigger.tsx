import {Button, Flex, Icon} from "antd-mobile";
import * as React from "react";
import {compose} from "react-apollo";
import { connect } from "react-redux";
import Ripples from "react-ripples";
import {Link} from "react-router-dom";
import { ACTION_RESET, ACTION_TOOTLE_MENU } from "../../layout/constants";
import {ILayout} from "../model";

interface IMenuTriggerProps {
  router: any;
  dispatch: any;
  height: number;
}

class MenuTrigger extends React.Component<IMenuTriggerProps, any> {

  public onClick = (e) => {
    e.preventDefault();
    this.props.dispatch({type: ACTION_RESET});
  }

  public render() {
    const { router, height } = this.props;
    return (
      <Ripples onClick={this.onClick}>
        <Link to="/">
          <Flex align="center" style={{color: "white", padding: `0 ${height / 3}px`, height}}>
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
    );
  }
}

const mapStateToProps: any = (state) => ({
  layout: state.layout,
  router: state.router,
});

export default compose(
    connect<any, {}, any>(mapStateToProps),
)(MenuTrigger);
