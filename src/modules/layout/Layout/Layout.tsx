import * as React from "react";
import { Icon, WingBlank, List, Button, Flex } from "antd-mobile";
import { Link } from "react-router-dom";
import { Header, Footer, SidebarCatalog } from "../index";
import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { ACTION_TOOTLE_CATALOG } from "../constants";
import Sidebar from "react-sidebar";


class Layout extends React.Component<any,any> {
  render() {
    return (
      <div>
        <Header/>
        <SidebarCatalog>
          <div style={{paddingTop: 90}}>
            {this.props.children}
          </div>
        </SidebarCatalog>
      </div>
    )
  }
}

export default Layout;
