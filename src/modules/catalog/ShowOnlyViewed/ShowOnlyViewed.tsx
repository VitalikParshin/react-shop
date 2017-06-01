import * as React from "react";
import {Icon} from "antd-mobile";
import { connect } from "react-redux";
import {ACTION_TOGGLE_SHOW_ONLY_VIEWED} from "../constants";

class ShowOnlyViewed extends React.Component<any, any> {

  toggleViewed = (e) => {
    const { dispatch } = this.props;
    dispatch({type: ACTION_TOGGLE_SHOW_ONLY_VIEWED});
  }

  render() {
    const { catalog: { showOnlyViewed } } = this.props;
    return (
      <div
          style={{position: "fixed", bottom: 0, left: 20}}
          onClick={this.toggleViewed}
      >
        <Icon
          type={require("!svg-sprite!./viewed.svg")}
          size="lg"
          style={{fill: showOnlyViewed ? "orange" : "grey"}}
        />
      </div>
    )
  }
}

const mapStateToProps: any = (state) => ({
  catalog: state.catalog,
})

export default connect<any, {}, any>(mapStateToProps)(ShowOnlyViewed)




