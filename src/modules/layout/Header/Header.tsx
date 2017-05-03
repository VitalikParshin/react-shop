import * as React from "react";
import { List, WingBlank, Flex, Button, NoticeBar, NavBar, Icon, Card } from "antd-mobile";
import { Link } from  "react-router-dom";
import { CatalogTrigger } from "../index";
import { ShoppingCartTrigger } from "../../shoppingCart/index";

// <Flex.Item><Icon style={{color:"white"}} type="ellipsis"/></Flex.Item>

class Header extends React.Component<any,any> {
  render() {
    return (
      <div style={{
        top: 0,
        background: "#08c",
        position: "fixed",
        width: "100%",
        padding: 10,
        zIndex: 100,
      }}>
        <Flex justify="between">
          <Flex.Item><CatalogTrigger/></Flex.Item>
          <Flex.Item><ShoppingCartTrigger/></Flex.Item>
        </Flex>
      </div>
    )
  }
}

export default Header;
