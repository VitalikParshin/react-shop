import { Button, Card, Flex, Icon, List, NavBar, NoticeBar, WingBlank } from "antd-mobile";
import * as React from "react";
import Ripples from "react-ripples";
import { Link } from "react-router-dom";
import styled from "../../../styled-components";
import {CatalogTrigger, HomeTrigger, MenuTrigger} from "../index";
export const HEIGHT = 80;

const FlexStyled = styled(Flex as any)`
  background: #08c;
  height: ${HEIGHT}px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
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
        <Icon
          type={require("!svg-sprite!./cart.svg")}
          size="md"
          style={{
            height: HEIGHT,
            padding: `0 ${HEIGHT / 3}px`,
          }}
        />

      </FlexStyled>
    );
  }
}

export default Header;
