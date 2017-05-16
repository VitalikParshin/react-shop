import * as React from "react";
import { List, WingBlank, Flex, Button, NoticeBar, NavBar, Icon, Card } from "antd-mobile";
import { Link } from  "react-router-dom";
import Ripples from "react-ripples";
import {CatalogTrigger, MenuTrigger, HomeTrigger} from "../index";
import {ShoppingCartTrigger} from "../../shoppingCart/index";

class Header extends React.Component<any,any> {
  render() {
    return (
      <Flex
        justify="between"
        align="center"
        style={{
          top: 0,
          background: "#08c",
          position: "fixed",
          width: "100%",
          zIndex: 100,
        }}
      >
        <HomeTrigger/>
        <MenuTrigger/>
        <CatalogTrigger/>
        <ShoppingCartTrigger/>
      </Flex>
    )
  }
}

export default Header;
