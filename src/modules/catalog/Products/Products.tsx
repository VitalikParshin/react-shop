import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";

import {
  Button,
  Card,
  Carousel,
  Drawer,
  Flex,
  Icon,
  List,
  NavBar,
  WingBlank,
} from "antd-mobile";

import update from "immutability-helper";
import MasonryInfiniteScroller from "react-masonry-infinite";
import { Link } from "react-router-dom";
import {Loading} from "../../layout/index";
import {Product, ProductsCounter, ShowOnlyViewed} from "../index";
import {ALL_PRODUCTS_QUERY, ICatalog} from "../model";

const LIMIT = 10;

const options = {
  options: (props) => ({
    fetchPolicy: "network-only",
    variables: {
      categoryId: props.categoryId,
      first: LIMIT,
      offset: 0,
    },
  }),
  props({ data: { loading, allProducts, fetchMore } }) {
    if (!loading) {
      // This is temp hack to exclude products without subProducts
      // TODO: Should be solved in GraphQL server
      allProducts = update(allProducts, {
        products: {
          $set: allProducts.products.filter((p) => p.subProducts.length !== 0),
        },
      });
    }
    return {
      allProducts,
      loading,
      fetchMore() {
        return fetchMore({
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.allProducts) { return prev; }
            return update(prev, {
              allProducts: {
                products: {
                  $push: fetchMoreResult.allProducts.products,
                },
              },
            });
          },
          variables: {
            offset: allProducts.products.length,
          },
        });
      },
    };
  },
};

interface IConnectedProductsProps {
  allProducts: any;
  fetchMore: any;
  loading: boolean;
}

interface IProductsProps {
  catalog: ICatalog;
}

class Products extends React.Component<IConnectedProductsProps & IProductsProps, any> {

  public ref;

  public bottomHeight: number;
  public threshold = 800;

  public state = {
    haveMoreProducts: true,
    scrolledProducts: 0,
  };

  public refineScrolledProducts = (scrolledProducts) => {
    const { fetchMore, allProducts: {products, total} } = this.props;

    if (scrolledProducts < LIMIT) {
      scrolledProducts = LIMIT > total ? total : LIMIT;
    } else if (scrolledProducts > total) {
      scrolledProducts = total;
    }
    return scrolledProducts;
  }

  public handleScroll = (event) => {
    const { fetchMore, allProducts: {products, total} } = this.props;

    // Calculate scrolled products
    const { scrolledProducts, haveMoreProducts } = this.state;
    const scrolled = (
      Math.round(
        event.srcElement.scrollTop
        / this.bottomHeight
        * products.length,
      )
    );
    this.setState({scrolledProducts: scrolled});

    if (event.srcElement.scrollTop > this.bottomHeight && haveMoreProducts === true) {
      window.removeEventListener("scroll", this.handleScroll, true);
      fetchMore();
    }
  }

  public componentDidUpdate = (prevProps, prevState) => {
    const { loading, allProducts } = this.props;
    if (loading === false) {
      window.addEventListener("scroll", this.handleScroll, true);
      this.bottomHeight = (
        this.ref.offsetTop + this.ref.clientHeight
        - window.innerHeight - this.threshold
      );
    }
  }

  public componentWillReceiveProps = (nextProps) => {
    const { loading, allProducts } = nextProps;
    if (loading === false ) {
      const { products, total } = allProducts;
      if (products.length >= total) {
        this.setState({
          haveMoreProducts: false,
        });
      }
    }
  }

  public render() {
    const {
      loading,
      allProducts,
      fetchMore,
      catalog: {showOnlyViewed, viewedProductIds},
    } = this.props;

    if (loading === true) {
      return <Loading/>;
    }
    const { products, total } = allProducts;
    const filteredProducts = (
      showOnlyViewed === true
      ? products.filter((p) => viewedProductIds.indexOf(p.id) !== -1)
      : products
    );

    let padding: number;
    let gutter: number;
    if (window.innerWidth <= 640) {
      padding = 4;
      gutter = 15;
    } else if (window.innerWidth <= 750) {
      padding = 8;
      gutter = 17;
    } else {
      padding = 10;
      gutter = 20;
    }

    return (
      <div style={{padding}} ref={(element) => this.ref = element}>
        <MasonryInfiniteScroller
          sizes={[{ columns: 2, gutter }]}
          style={{
            marginBottom: 35,
          }}
        >
          {filteredProducts.map((product, i) => {
            return <Product key={i} {...product}/>;
          })}
        </MasonryInfiniteScroller>

        <div
          style={{
            display: this.state.haveMoreProducts ? "block" : "none",
            paddingTop: 10,
            textAlign: "center",
          }}
        >
          <Icon type="loading" size="lg"/>
        </div>

        <ProductsCounter
          scrolled={this.refineScrolledProducts(this.state.scrolledProducts)}
          total={total}
        />

        <ShowOnlyViewed/>

      </div>
    );
  }
}

const mapStateToProps: any = (state) => ({
  catalog: state.catalog,
});

export default compose(
    connect<any, {}, any>(mapStateToProps),
    graphql(ALL_PRODUCTS_QUERY, options),
)(Products);
