import * as React from "react";
import {
  Icon,
  WingBlank,
  List,
  Button,
  Flex,
  Modal,
  WhiteSpace
} from "antd-mobile";
import {Link} from "react-router-dom";
import {Header, Footer, SidebarCatalog, FlatPages} from "../index";
import {compose, graphql} from "react-apollo";
import { connect } from "react-redux";
import { ACTION_TOOTLE_CATALOG } from "../constants";
import Sidebar from "react-sidebar";


class Menu extends React.Component<any,any> {
  render() {
    return (
      <div style={{
        background: "white",
        height: "100%",
      }}>
        <Flex justify="center" align="center">
          <img src="http://static1.buybag.com.ua/static/img/logo.png"/>
        </Flex>
        <WhiteSpace size="lg" />
        <FlatPages/>
      </div>
    )
  }
}

export default Menu;
