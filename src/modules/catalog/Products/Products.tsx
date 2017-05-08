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
import MasonryInfiniteScroller from "react-masonry-infinite";
import { Link } from "react-router-dom";
import { PRODUCTS_QUERY } from "../model";
import { Product } from "../index";
import { Loading } from "../../layout/index";

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

  ref;
  bottomHeight;
  threshold = 500;

  componentDidUpdate = (prevProps, prevState) => {
    const { loading, products } = this.props;
    if (loading === false && products.length % LIMIT == 0) {
      window.addEventListener('scroll', this.handleScroll, true);
      this.bottomHeight = (
        this.ref.clientHeight
        + this.ref.offsetTop
        - window.innerHeight
        - this.threshold
      );
    }
  }

  handleScroll = (event) => {
    const { fetchMore } = this.props;
    if (event.srcElement.scrollTop > this.bottomHeight) {
      window.removeEventListener('scroll', this.handleScroll, true);
      fetchMore();
    }
  }

  render() {
    const { loading, products, fetchMore } = this.props;
    if (loading == true) {
      return <Loading/>
    }
    return (
      <div ref={element => this.ref = element}>
        <MasonryInfiniteScroller
          sizes={[{ columns: 2, gutter: 10 }]}
        >
          {products.map((product, i) => {
            return <Product key={i} {...product}/>
          })}
        </MasonryInfiniteScroller>
      </div>
    )
  }
}

const mapStateToProps: any = (state) => ({})

export default compose(
    connect<any, {}, any>(mapStateToProps),
    graphql(PRODUCTS_QUERY, options),
)(Products);


