import * as React from "react";
import { Button } from "antd-mobile";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import {ACTION_TOOTLE_CATALOG} from "../../layout/constants";

class FilterTrigger extends React.Component<any,any> {

  onClick = () => {
    this.props.dispatch({type: ACTION_TOOTLE_CATALOG})
  }

  render() {
    return (
      <span style={{color: "white"}} onClick={this.onClick}>КАТАЛОГ</span>
    )
  }
}

const mapStateToProps: any = (state) => ({
})

export default compose(
    connect<any, {}, any>(mapStateToProps),
)(FilterTrigger);
