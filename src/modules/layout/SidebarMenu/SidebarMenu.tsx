import { Drawer } from "antd-mobile";
import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import {ACTION_TOOTLE_CATALOG, ACTION_TOOTLE_MENU} from "../constants";
import {Menu, utils} from "../index";
import {ILayout} from "../model";

interface IConnectedSidebarMenu {
  layout: ILayout;
  dispatch: any;
}

class SidebarMenu extends React.Component<IConnectedSidebarMenu & any, any> {

  public onSetSidebarOpen = () => {
    const { dispatch } = this.props;
    dispatch({type: ACTION_TOOTLE_MENU});
  }

  public render() {
    const { layout } = this.props;

    return (
      <Drawer
          touch={utils.swipeEnabled()}
          sidebar={<Menu/>}
          open={layout.openMenu}
          onOpenChange={this.onSetSidebarOpen as any}
          contentStyle={{marginTop: 80}}
      >
        {this.props.children}
      </Drawer>
    );
  }
}

const mapStateToProps: any = (state) => ({
  layout: state.layout,
});

export default compose(
    connect<IConnectedSidebarMenu, {}, any>(mapStateToProps),
)(SidebarMenu);
