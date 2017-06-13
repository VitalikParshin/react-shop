import { Drawer } from "antd-mobile";
import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
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
    connect<any, {}, any>(mapStateToProps),
)(SidebarCatalog);
