import { Drawer } from "antd-mobile";
import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import { ACTION_TOOTLE_CATALOG } from "../constants";
import { Catalog, utils } from "../index";
import { ILayout } from "../model";

interface IConnectedSideBarProps {
  layout: ILayout;
  dispatch: any;
}

class SidebarCatalog extends React.Component<IConnectedSideBarProps, any> {

  public onSetSidebarOpen = () => {
    const { dispatch } = this.props;
    dispatch({type: ACTION_TOOTLE_CATALOG});
  }

  public render() {
    const { layout } = this.props;
    return (
      <Drawer
        touch={utils.swipeEnabled()}
        sidebar={<Catalog isDrawer={true}/>}
        open={layout.openCatalog}
        onOpenChange={this.onSetSidebarOpen as any}
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
    connect<IConnectedSideBarProps, {}, any>(mapStateToProps),
)(SidebarCatalog);
