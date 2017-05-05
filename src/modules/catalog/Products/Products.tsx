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

const defaultItems = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];


// class Products extends React.Component<any,any> {

//   static defaultProps = {
//     maxCount: 5,
//     perPage: 20
//   }

//   state = {
//     count: 0,
//     isLoading: false,
//     items: defaultItems,
//   }


//   getItems() {
//     if (this.state.count >= this.props.maxCount) return
//     this.setState(Object.assign(
//       {},
//       this.state,
//       { isLoading: true }
//     ), () => {
//       setTimeout(() => {
//         this.setState(Object.assign(
//           {},
//           this.state,
//           {
//             isLoading: false,
//             items: this.state.items.concat(
//               defaultItems,
//             )
//           }
//         ))
//       })
//     })
//   }

//   render() {
//     return (
//       <MasonryLayout
//         id="items"
//         infiniteScroll={this.getItems}
//         infiniteScrollLoading={this.state.isLoading} >

//         {this.state.items.map((v, i) => <div
//           key={i}
//           style={{
//             width: '236px',
//             height: `${i % 2 === 0 ? 4 * 50 : 50 }px`,
//             display: 'block',
//             background: 'rgba(0,0,0,0.7)'
//           }}
//           />)}
//       </MasonryLayout>
//     )
//   }
// }


class Products extends React.Component<any,any> {

  static defaultProps = {
    maxCount: 5,
    perPage: 10,
  }

  state = {
    count: 0,
    isLoading: true,
    items: [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined]
  }

  render() {
    const { loading, products, fetchMore } = this.props;
    if (loading == true) {
      return <MasonryLayout
          sizes={[{ columns: 2, gutter: 10 }]}
          id="items"
          infiniteScrollLoading={true}
      >{this.state.items.map(item => <div></div>)}</MasonryLayout>
    }
    this.setState({loading: false})
    return (
      <div>
        <MasonryLayout
          sizes={[{ columns: 2, gutter: 10 }]}
          id="items"
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


