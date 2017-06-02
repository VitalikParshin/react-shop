import * as React from "react";
import {ACTION_SELECT_SUBPRODUCT, ACTION_SELECT_COLOR} from "../constants";

import { Button, Flex } from "antd-mobile";
import { compose, gql, graphql } from "react-apollo";

import {Images, ProductTabs} from "../index";
import {Loading} from "../../layout/index";
import { PRODUCT_QUERY } from "../../catalog/model";
import { connect } from "react-redux";
import {ACTION_ADD_VIEWED_PRODUCT} from "../../catalog/constants";

interface ConnectedProductProps {
  data?: any;
  product: any;
  dispatch: any;
};

interface ProductProps {
  id: Number;
};

const options = {
  options: props => ({
    variables: {
      id: props.id
    }
  })
};

function createMarkup(html) {
  return {__html: html};
}

class Product extends React.Component<ConnectedProductProps & ProductProps, any> {

  constructor(props) {
    super(props);
    const { dispatch, id } = props;
    dispatch({type: ACTION_ADD_VIEWED_PRODUCT, productId: id })
  }

  componentWillReceiveProps = (nextProps) => {
    const { data } = nextProps;
    const { loading } = data;
    if(loading === false) {
      const { product: { subProducts } } = data;
      const { subProductId } = nextProps.product;
      const subProductIds = subProducts.map(sp => sp.id);
      if(subProductIds.indexOf(subProductId) === -1) {
        this.props.dispatch({
          type: ACTION_SELECT_SUBPRODUCT,
          subProductId: subProductIds[0],
        })
      }
    }
  }

  render() {
    const {data, product: { subProductId } } = this.props;
    const { loading, product } = data;
    if (loading == true || subProductId === null) {
      return <Loading/>
    }
    const { brand, images, subProducts } = product;
    const activeSubProduct = subProducts.filter(sp => sp.id === subProductId)[0] || subProducts[0];

    return (
      <div style={{ textAlign:"left" }}>
        <ProductTabs dataProduct={product} activeSubProduct={activeSubProduct}/>
      </div>
    )
  }
}

const mapStateToProps: any = (state) => ({
  product: state.product
})

export default compose(
    connect<ConnectedProductProps, {}, ProductProps>(mapStateToProps),
    graphql(PRODUCT_QUERY, options),
)(Product);
