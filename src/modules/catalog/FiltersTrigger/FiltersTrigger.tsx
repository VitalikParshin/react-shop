import * as React from "react";
import { Button } from "antd-mobile";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import {ACTION_TOOTLE_FILTERS} from "../../layout/constants";

class FiltersTrigger extends React.Component<any,any> {

  onClick = () => {
    this.props.dispatch({type: ACTION_TOOTLE_FILTERS})
  }

  render() {
    return (
      <Button onClick={this.onClick}>ФИЛЬТРЫ</Button>
    )
  }
}

const mapStateToProps: any = (state) => ({
})

export default compose(
    connect<any, {}, any>(mapStateToProps),
)(FiltersTrigger);
