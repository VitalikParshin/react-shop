import { Button, Card, Flex, Icon, List, NavBar, NoticeBar, WingBlank } from "antd-mobile";
import * as React from "react";
import Ripples from "react-ripples";
import { Link } from "react-router-dom";
import styled from "../../../styled-components";
import {ShoppingCartTrigger} from "../../shoppingCart/index";
import {CatalogTrigger, HomeTrigger, MenuTrigger} from "../index";
export const HEIGHT = 80;

const FlexStyled = styled(Flex as any)`
  background: #08c;
  height: ${HEIGHT};
  position: fixed;
  top: 0;
  width: 100%;
  zIndex: 100;
` as any;

class Header extends React.Component<any, any> {
  public render() {
    return (
      <FlexStyled
        justify="between"
        align="center"
      >
        <HomeTrigger height={HEIGHT}/>
        <MenuTrigger height={HEIGHT}/>
        <CatalogTrigger height={HEIGHT}/>
        <ShoppingCartTrigger height={HEIGHT}/>
      </FlexStyled>
    );
  }
}

export default Header;
