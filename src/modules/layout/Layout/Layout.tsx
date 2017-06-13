import { Button, Flex, Icon, List, WingBlank } from "antd-mobile";
import * as React from "react";
import {compose, graphql} from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ACTION_TOOTLE_CATALOG } from "../constants";
import {HEIGHT} from "../Header/Header";
import {Footer, Header, SidebarCatalog, SidebarMenu} from "../index";

class Layout extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Header/>
        <SidebarMenu>
          <SidebarCatalog>
            {this.props.children}
          </SidebarCatalog>
        </SidebarMenu>
      </div>
    );
  }
}

export default Layout;
