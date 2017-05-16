import * as React from "react";
import { Icon, WingBlank, List, Button, Flex } from "antd-mobile";
import { Link } from "react-router-dom";
import {Header, Footer, SidebarCatalog, SidebarMenu} from "../index";
import {compose, graphql} from "react-apollo";
import { connect } from "react-redux";
import { ACTION_TOOTLE_CATALOG } from "../constants";
import Sidebar from "react-sidebar";
import {HEIGHT} from "../Header/Header";

class Layout extends React.Component<any,any> {
  render() {
        // <SidebarMenu>
        //   <SidebarCatalog>
        //     {this.props.children}
        //   </SidebarCatalog>
        // </SidebarMenu>


    return (
      <div>
        <Header/>
        <div style={{marginTop: HEIGHT + 15 }}>{this.props.children}</div>
      </div>
    )
  }
}

export default Layout;
