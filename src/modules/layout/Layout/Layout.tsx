import * as React from "react";
import { Icon, WingBlank, List, Button } from "antd-mobile";
import { Link } from "react-router-dom";
import { Header, Footer } from "../index";

class Layout extends React.Component<any,any> {
  render() {
    return (
      <div>
        <Header/>
        <div style={{paddingTop: 68}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout;
