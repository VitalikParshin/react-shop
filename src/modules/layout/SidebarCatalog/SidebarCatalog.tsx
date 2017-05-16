import * as React from "react";
import { ACTION_TOOTLE_CATALOG } from "../constants";
import Sidebar from "react-sidebar";
import { gql, compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Catalog, utils } from "../index";

class SidebarCatalog extends React.Component<any,any> {

  onSetSidebarOpen = () => {
    const { dispatch } = this.props;
    dispatch({type: ACTION_TOOTLE_CATALOG})
  }

  render() {
    const { layout } = this.props;

    return <Sidebar
      touch={utils.swipeEnabled()}
      touchHandleWidth={50}
      sidebar={<Catalog isDrawer={true}/>}
      open={layout.openCatalog}
      onSetOpen={this.onSetSidebarOpen as any}
    >
      {this.props.children}
    </Sidebar>
  }
}


const mapStateToProps: any = (state) => ({
  layout: state.layout,
})

export default compose(
    connect<any, {}, any>(mapStateToProps),
)(SidebarCatalog);
