import * as React from "react";
import { Button, Icon } from "antd-mobile";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import {
  ACTION_TOOTLE_MENU
} from "../../layout/constants";
import {ILayout} from "../model";
import Ripples from "react-ripples";

interface MenuTriggerProps {
  layout: ILayout;
  dispatch: any;
  height: number;
}

class MenuTrigger extends React.Component<MenuTriggerProps,any> {

  onClick = (e) => {
    e.preventDefault();
    this.props.dispatch({type: ACTION_TOOTLE_MENU});
  }

  render() {
    const { layout, height } = this.props;
    return (
      <Ripples>
        <Icon
          type={layout.openMenu === true ? require("!svg-sprite!./revert.svg") : require("!svg-sprite!./icon_menu.svg") }
          size="xs"
          onClick={this.onClick}
          style={{
            fill: layout.openMenu === true ? "orange" : "white",
            height: height,
            padding: `0 ${height/2}px`
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
)(MenuTrigger);
