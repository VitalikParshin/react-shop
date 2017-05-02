import * as React from "react";
import { gql, compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import {
  Drawer,
  List,
  NavBar,
  Icon,
  WingBlank,
  Carousel,
  Flex,
  Card,
  Button
} from "antd-mobile";
import {Link} from "react-router-dom";
import { PRODUCTS_QUERY } from "../model";
import { Product } from "../index";

const LIMIT = 20;

const options = {
  options: props => ({
    variables: {
      categoryId: props.categoryId,
      offset: 0,
      limit: LIMIT,
    },
    fetchPolicy: "network-only",
  }),
  props({ data: { loading, products, fetchMore } }) {
    return {
      loading,
      products,
      fetchMore() {
        return fetchMore({
          variables: {
            offset: products.length,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.products) { return prev; }
            return Object.assign({}, prev, {
              products: [...prev.products, ...fetchMoreResult.products],
            });
          },
        });
      },
    };
  }  
};

class Products extends React.Component<any,any> {
  render() {
    const { loading, products, fetchMore } = this.props;
    if (loading == true) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <div>
          {products.map(product => (
            <Product {...product} />
          ))}
        </div>
        <div style={{clear: "both"}}>
          {products.length % LIMIT == 0 ? (
            <Button disabled={loading} loading={loading} type="primary" onClick={fetchMore}>
              ЕЩЕ ТОВАРОВ
            </Button>    
          ) : ""} 
        </div>
      </div>
    )
  }
}

const mapStateToProps: any = (state) => ({})

export default compose(
    connect<any, {}, any>(mapStateToProps),
    graphql(PRODUCTS_QUERY, options),
)(Products);
