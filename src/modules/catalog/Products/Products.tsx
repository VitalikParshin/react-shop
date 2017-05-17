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
import { ALL_PRODUCTS_QUERY } from "../model";
import { Product, ProductsCounter } from "../index";
import { Loading } from "../../layout/index";
import update from "immutability-helper";

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
  props({ data: { loading, allProducts, fetchMore } }) {
    return {
      loading,
      allProducts,
      fetchMore() {
        return fetchMore({
          variables: {
            offset: allProducts.products.length,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.allProducts) { return prev };
            return update(prev, {
              allProducts: {
                products: {
                  $push: fetchMoreResult.allProducts.products,
                },
              }
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
  threshold = 800;

  state = {
    haveMoreProducts: true,
  }

  handleScroll = (event) => {
    const { fetchMore } = this.props;
    if (event.srcElement.scrollTop > this.bottomHeight) {
      window.removeEventListener('scroll', this.handleScroll, true);
      fetchMore();
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { loading, allProducts } = this.props;
    if (loading === false && allProducts.products.length % LIMIT == 0) {
      window.addEventListener('scroll', this.handleScroll, true);
      this.bottomHeight = (
        this.ref.offsetTop + this.ref.clientHeight
        - window.innerHeight - this.threshold
      );
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { loading, allProducts } = nextProps;
    if (loading === false ) {
      const { products, total } = allProducts;
      if (products.length >= total) {
        this.setState({
          haveMoreProducts: false
        });
      }
    }
  }

  render() {
    const { loading, allProducts, fetchMore } = this.props;
    if (loading == true) {
      return <Loading/>
    }
    const { products, total } = allProducts;

    let padding: number;
    let gutter: number;
    if (window.innerWidth <= 640) {
      padding = 4;
      gutter = 15
    } else if (window.innerWidth <= 750) {
      padding = 8;
      gutter = 17;
    } else {
      padding = 10;
      gutter = 20;
    }


    return (
      <div style={{padding: padding}} ref={element => this.ref = element}>
        <MasonryInfiniteScroller
          sizes={[{ columns: 2, gutter: gutter }]}
        >
          {products.map((product, i) => {
            return <Product key={i} {...product}/>
          })}
        </MasonryInfiniteScroller>

        <div
          style={{
            display: this.state.haveMoreProducts ? "block" : "none",
            textAlign: "center",
            paddingTop: 30,
          }}
        >
          <Icon type="loading" size="lg"/>
        </div>

        <ProductsCounter current={products.length} total={total}/>
      </div>
    )
  }
}

const mapStateToProps: any = (state) => ({})

export default compose(
    connect<any, {}, any>(mapStateToProps),
    graphql(ALL_PRODUCTS_QUERY, options),
)(Products);


