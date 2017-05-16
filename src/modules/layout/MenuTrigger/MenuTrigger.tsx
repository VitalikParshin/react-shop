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
  layout: ILayout,
  dispatch: any,
}

class MenuTrigger extends React.Component<MenuTriggerProps,any> {

  onClick = (e) => {
    e.preventDefault();
    this.props.dispatch({type: ACTION_TOOTLE_MENU});
  }

  render() {
    const { layout } = this.props;
    return (
      <Ripples>
        <Icon
          type={require("!svg-sprite!./menu.svg")}
          size="md"
          onClick={this.onClick}
          style={{
            fill: layout.openMenu === true ? "orange" : "white",
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
)(MenuTrigger);
