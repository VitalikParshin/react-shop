import * as React from "react";
import { gql, compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Drawer, List, NavBar, Icon, WingBlank, Carousel, Flex, Card } from "antd-mobile";
import { Link } from "react-router-dom";
import { PRODUCT_QUERY } from "../model";
import { Product } from "../index";

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

class Products extends React.Component<any,any> {
  render() {
    const { loading, products } = this.props.data;
    if (loading == true) {
      return <div>Loading...</div>
    }

    return (
      <div>
        {products.map(product => (
          <Product {...product} /> 
        ))}
      </div>
    )

  }
}

const mapStateToProps: any = (state) => ({})

export default compose(
    connect<any, {}, any>(mapStateToProps),
    graphql(PRODUCT_QUERY, options),
)(Products);
