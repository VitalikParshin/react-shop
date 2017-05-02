import * as React from "react";
import {Icon, WingBlank, List, Button, Flex} from "antd-mobile";
import {Link} from "react-router-dom";
import { Header, Footer } from "../index";
import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";


class Layout extends React.Component<any,any> {
  render() {
    return (
      <div>
        <Header/>
        <div style={{paddingTop: 90}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout;
