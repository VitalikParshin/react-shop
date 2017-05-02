import * as React from "react";
import { Icon, WingBlank, List, Button } from "antd-mobile";
import { Link } from "react-router-dom";
import { Header, Footer } from "../index";

class Layout extends React.Component<any,any> {
  render() {
    return (
      <div>
        <Header/>

        <WingBlank>
          <List>
          <List.Item><Link to="/">Home</Link></List.Item>
          </List>
        </WingBlank>

        {this.props.children}

      </div>
    )
  }
}

export default Layout;