import * as React from "react";
import {Button} from "antd-mobile";
import {Link} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {WingBlank, List} from "antd-mobile";

class Layout extends React.Component<any,any> {
  render() {
    return (
      <div>
        <Header/>

        <WingBlank>
          Pages:
          <List>
          <List.Item><Link to="/">Home</Link></List.Item>
          <List.Item><Link to="/catalog">Catalog</Link></List.Item>
          <List.Item><Link to="/product">Product</Link></List.Item>
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