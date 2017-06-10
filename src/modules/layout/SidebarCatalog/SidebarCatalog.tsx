import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import Sidebar from "react-sidebar";
import { ACTION_TOOTLE_CATALOG } from "../constants";
import { Catalog, utils } from "../index";

class SidebarCatalog extends React.Component<any, any> {

  public onSetSidebarOpen = () => {
    const { dispatch } = this.props;
    // this.setProps({style:{overflow:"hidden"}})
    dispatch({type: ACTION_TOOTLE_CATALOG});
  }

  public render() {
    const { layout } = this.props;
    return (
      <Sidebar
        touch={utils.swipeEnabled()}
        touchHandleWidth={utils.swipeEnabled() ? 50 : undefined}
        sidebar={<Catalog isDrawer={true}/>}
        open={layout.openCatalog}
        onSetOpen={this.onSetSidebarOpen as any}
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
    connect<any, {}, any>(mapStateToProps),
)(SidebarCatalog);
