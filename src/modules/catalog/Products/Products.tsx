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
import {Loading} from "../../layout/index";
import MasonryLayout from "react-masonry-layout";

const LIMIT = 10;

const options = {
  options: props => ({
    variables: {
      categoryId: props.categoryId,
      offset: 0,
      first: LIMIT,
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
      return <Loading/>
    }
    return (
      <div>
        <MasonryLayout
          sizes={[{ columns: 2, gutter: 10 }]}
          id="products"
        >
          {products.map((product, i) => {
            return <Product key={i} {...product}/>
          })}
        </MasonryLayout>
        <div style={{ clear: "both", padding: 5 }}>
          {products.length === 0 || products.length % LIMIT == 0 ? (
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


