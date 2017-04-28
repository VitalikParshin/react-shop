import * as React from "react";
import { WingBlank, List } from "antd-mobile";
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

        <WingBlank>
          {this.props.children}
        </WingBlank>

        <Footer/>
      </div>
    )
  }
}

export default Layout;