import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import Sidebar from "react-sidebar";
import {ACTION_TOOTLE_CATALOG, ACTION_TOOTLE_MENU} from "../constants";
import {Menu, utils} from "../index";
import {ILayout} from "../model";
import {HEIGHT} from "../Header/Header";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

interface IConnectedSidebarMenu {
  layout: ILayout;
  dispatch: any;
}

class SidebarMenu extends React.Component<IConnectedSidebarMenu & any, any> {

  onSetSidebarOpen = () => {
    const { dispatch } = this.props;
    dispatch({type: ACTION_TOOTLE_MENU});
  }

  render() {
    const { layout } = this.props;

    return (
      <Sidebar
          // contentStyle={{marginTop: HEIGHT}}
          contentClassName={styles.content}
          open={layout.openMenu}
          onSetOpen={this.onSetSidebarOpen as any}
          sidebar={<Menu/>}
          // sidebarStyle={{marginTop: HEIGHT}}
          sidebarClassName={styles.sideber}
          // touch={utils.swipeEnabled()}
          touch={false}
      >
        {this.props.children}
      </Sidebar>
    );
  }
}

const mapStateToProps: any = (state) => ({
  layout: state.layout,
});

export default compose(
    connect<IConnectedSidebarMenu, {}, any>(mapStateToProps),
)(SidebarMenu);
