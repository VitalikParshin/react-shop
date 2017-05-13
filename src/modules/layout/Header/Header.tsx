import * as React from "react";
import { List, WingBlank, Flex, Button, NoticeBar, NavBar, Icon, Card } from "antd-mobile";
import { Link } from  "react-router-dom";
import {CatalogTrigger, MenuTrigger} from "../index";
import {ShoppingCartTrigger} from "../../shoppingCart/index";

class Header extends React.Component<any,any> {
  render() {
    return (
      <Flex
        justify="between"
        style={{
          top: 0,
          background: "#08c",
          position: "fixed",
          width: "100%",
          zIndex: 100,
        }}
      >
        <Flex.Item><MenuTrigger/></Flex.Item>
        <Flex.Item><CatalogTrigger/></Flex.Item>
        <Flex.Item>
          <Link to="/">
            <span  style={{ padding: 15, color: "white" }}>HOME</span>
          </Link>
        </Flex.Item>
        <Flex.Item style={{ maxWidth: 80 }}><ShoppingCartTrigger/></Flex.Item>
      </Flex>
    )
  }
}

export default Header;
