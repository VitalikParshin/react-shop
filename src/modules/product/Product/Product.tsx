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
    const { loading, product } = data;
    const selectedProduct = nextProps.product;
    if(loading === false && selectedProduct.subProductId === null) {
      const { subProducts } = product;
      const subProductId = subProducts[0].id;
      this.props.dispatch({type: ACTION_SELECT_SUBPRODUCT, subProductId: subProductId})
    }
  }

  render() {
    const { loading, product } = this.props.data;
    if (loading == true) {
      return <Loading/>
    }
    const { brand, images, subProducts } = product;
    const subProductId = this.props.product.subProductId;
    const cureProduct =  subProducts.filter(el => el.id === subProductId)

    return (
      <div style={{ textAlign:"left" }}>
        <ProductTabs dataProduct={product} cureProduct={cureProduct}/>
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
