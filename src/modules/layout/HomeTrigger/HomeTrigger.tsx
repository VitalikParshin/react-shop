import {Button, Flex, Icon} from "antd-mobile";
import * as React from "react";
import {compose} from "react-apollo";
import { connect } from "react-redux";
import Ripples from "react-ripples";
import {Link} from "react-router-dom";
import { ACTION_RESET, ACTION_TOOTLE_MENU } from "../../layout/constants";
import {ILayout} from "../model";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

interface IConnectedHomeTriggerProps {
  router: any;
  dispatch: any;
  layout: ILayout;
}

interface IHomeTriggerProps {
  height: number;
}

class HomeTrigger extends React.Component<IConnectedHomeTriggerProps & IHomeTriggerProps, any> {

  public onClick = (e) => {
    e.preventDefault();
    this.props.dispatch({type: ACTION_RESET});
  }

  public render() {
    const { router, height } = this.props;
    return (
      <Ripples onClick={this.onClick}>
        <Link to="/">
          <Flex
              className={styles.homeTrigger}
              align="center"
              style={{padding: `0 ${height / 3}px`, height}}
          >BUY
            <Icon
                className={styles.icon}
                type={require("!svg-sprite!./packet_filled.svg")}
                size="md"
                style={{
                  fill: router.location.pathname === "/" ? "orange" : "white",
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
    connect<IConnectedHomeTriggerProps, {}, IHomeTriggerProps>(mapStateToProps),
)(HomeTrigger);
