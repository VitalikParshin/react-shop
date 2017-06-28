import {Button, Flex, Icon} from "antd-mobile";
import * as React from "react";
import {compose} from "react-apollo";
import { connect } from "react-redux";
import Ripples from "react-ripples";
import {Link, NavLink} from "react-router-dom";
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

const Logo = ({height, isActive}) => {
  return (
    <Flex
        className={styles.homeTrigger}
        align="center"
        style={{
          height,
          padding: `0 20px`,
        }}
    >
      BUY
      <Icon
          className={styles.icon}
          type={require("!svg-sprite-loader!./logo.svg")}
          size="md"
          style={{
            fill: isActive ? "orange" : "white",
          }}
      />
      BAG
    </Flex>
  );
};

class HomeTrigger extends React.Component<IConnectedHomeTriggerProps & IHomeTriggerProps, any> {

  public onClick = (e) => {
    e.preventDefault();
    this.props.dispatch({type: ACTION_RESET});
  }

  public render() {
    const { router, height } = this.props;
    const isActive = router.location.pathname === "/";
    if (isActive) {
      return <Logo height isActive={true} />;
    } else {
      return (
        <Link to="/" style={{height}}>
          <Logo height isActive={false} />
        </Link>
      );
    }
  }
}

const mapStateToProps: any = (state) => ({
  layout: state.layout,
  router: state.router,
});

export default compose(
    connect<IConnectedHomeTriggerProps, {}, IHomeTriggerProps>(mapStateToProps),
)(HomeTrigger);
