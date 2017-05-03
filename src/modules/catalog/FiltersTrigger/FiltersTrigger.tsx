import * as React from "react";
import { Button, Icon } from "antd-mobile";
import {compose} from "react-apollo";
import { connect } from "react-redux";
import {ACTION_TOOTLE_FILTERS} from "../../layout/constants";

class FiltersTrigger extends React.Component<any,any> {

  onClick = () => {
    this.props.dispatch({type: ACTION_TOOTLE_FILTERS})
  }

  render() {
    return (
      <Button
        icon={require("!svg-sprite!./filter.svg")}
        type="primary"
        onClick={this.onClick}
        size="small"
      >
        ФИЛЬТРЫ
      </Button>
    )
  }
}

const mapStateToProps: any = (state) => ({
})

export default compose(
    connect<any, {}, any>(mapStateToProps),
)(FiltersTrigger);
