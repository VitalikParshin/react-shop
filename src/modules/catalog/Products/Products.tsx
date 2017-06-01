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
import {ALL_PRODUCTS_QUERY, ICatalog} from "../model";
import {Product, ProductsCounter, ShowOnlyViewed} from "../index";
import {Loading} from "../../layout/index";
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
    if (!loading) {
      // This is temp hack to exclude products without subProducts
      // TODO: Should be solved in GraphQL server
      allProducts = update(allProducts, {
        products: {
          $set: allProducts.products.filter(p => p.subProducts.length != 0)
        }
      })
    }
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

interface ConnectedProductsProps {
  allProducts: any;
  fetchMore: any;
  loading: boolean;
}

interface ProductsProps {
  catalog: ICatalog;
}

class Products extends React.Component<ConnectedProductsProps & ProductsProps, any> {

  ref;
  bottomHeight: number;
  threshold = 800;

  state = {
    haveMoreProducts: true,
    scrolledProducts: 0,
  }

  refineScrolledProducts = (scrolledProducts) => {
    const { fetchMore, allProducts: {products, total} } = this.props;

    if (scrolledProducts < LIMIT) {
      scrolledProducts = LIMIT > total ? total : LIMIT;
    } else if (scrolledProducts > total) {
      scrolledProducts = total;
    }
    return scrolledProducts;
  }

  handleScroll = (event) => {
    const { fetchMore, allProducts: {products, total} } = this.props;

    // Calculate scrolled products
    const { scrolledProducts, haveMoreProducts } = this.state;
    let _scrolledProducts = (
      Math.round(
        event.srcElement.scrollTop
        / this.bottomHeight
        * products.length
      )
    )
    this.setState({scrolledProducts: _scrolledProducts})

    if (event.srcElement.scrollTop > this.bottomHeight && haveMoreProducts === true) {
      window.removeEventListener('scroll', this.handleScroll, true);
      fetchMore();
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { loading, allProducts } = this.props;
    if (loading === false) {
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
    const {
      loading,
      allProducts,
      fetchMore,
      catalog: {showOnlyViewed, viewedProductIds}
    } = this.props;

    if (loading == true) {
      return <Loading/>
    }
    const { products, total } = allProducts;
    const filteredProducts = (
      showOnlyViewed === true
      ? products.filter(p => viewedProductIds.indexOf(p.id) !== -1)
      : products
    )

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
          style={{
            marginBottom: 35,
          }}
        >
          {filteredProducts.map((product, i) => {
            return <Product key={i} {...product}/>
          })}
        </MasonryInfiniteScroller>

        <div
          style={{
            display: this.state.haveMoreProducts ? "block" : "none",
            textAlign: "center",
            paddingTop: 10,
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
    )
  }
}

const mapStateToProps: any = (state) => ({
  catalog: state.catalog,
})

export default compose(
    connect<any, {}, any>(mapStateToProps),
    graphql(ALL_PRODUCTS_QUERY, options),
)(Products);


