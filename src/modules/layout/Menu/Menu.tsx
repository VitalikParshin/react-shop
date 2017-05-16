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
    const width = window.innerWidth * 0.9
    return (
      <div style={{
        background: "white",
        height: "100%",
        width: width,
      }}>
        <Flex justify="center" align="center">
          <img
            style={{
              paddingTop: 100,
              width: "90%",
            }}
            src="http://static1.buybag.com.ua/static/img/logo.png"
          />
        </Flex>
        <WhiteSpace size="lg" />
        <FlatPages/>
      </div>
    )
  }
}

export default Menu;
