import * as React from "react";
import { gql, compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Drawer, List, NavBar, Icon, WingBlank, Carousel, Flex, Card } from "antd-mobile";
import { Link } from "react-router-dom";
import { SUB_PRODUCT_QUERY } from "../model";

import { Item } from "./Item";

const options = {
  options: props => ({
    variables: {
      filter: {
        category: {
          id: props.categoryId
        }
      }
    }
  })
};

class SubProducts extends React.Component<any,any> {
  render() {
    const { loading, allSubProducts } = this.props.data;
    if (loading == true) {
      return <div>Loading...</div>
    }

    return (
      <div>
        {allSubProducts.map(subProduct => (
          <Item {...subProduct} /> 
        ))}
      </div>
    )

  }
}

const mapStateToProps: any = (state) => ({})

export default compose(
    connect<any, {}, any>(mapStateToProps),
    graphql(SUB_PRODUCT_QUERY, options),
)(SubProducts);
