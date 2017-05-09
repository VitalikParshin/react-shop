import * as React from "react";
import { Button, Icon } from "antd-mobile";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import {
  ACTION_ENABLE_CATALOG,
  ACTION_DISABLE_CATALOG,
} from "../../layout/constants";

class FilterTrigger extends React.Component<any,any> {

  onClick = (e) => {
    e.preventDefault();
    this.props.dispatch({type: ACTION_ENABLE_CATALOG});
  }

  render() {
    return (
      <Icon type={require("!svg-sprite!./menu.svg")} onClick={this.onClick} />
    )
  }
}

const mapStateToProps: any = (state) => ({
})

export default compose(
    connect<any, {}, any>(mapStateToProps),
)(FilterTrigger);
