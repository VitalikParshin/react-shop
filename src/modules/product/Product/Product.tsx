import * as React from "react";
import {ACTION_SELECT_SUBPRODUCT, ACTION_SELECT_COLOR} from "../constants";

import { Button, Flex } from "antd-mobile";
import { compose, gql, graphql } from "react-apollo";
import Ripples from "react-ripples";

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

const getActiveSubProduct = (subProducts, subProductId) => {
  return subProducts.filter(sp => sp.id === subProductId)[0] || subProducts[0];
}

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
      const { product: { subProducts }, product } = data;
      const { subProductId } = nextProps.product;
      const subProductIds = subProducts.map(sp => sp.id);
      const subProductColor = product.images[0].id;
      if(subProductIds.indexOf(subProductId) === -1) {
        this.props.dispatch({
          type: ACTION_SELECT_SUBPRODUCT,
          subProductId: subProductIds[0],
          colorId: subProductColor,
        })
      }
    }
  }

  // onClick = (e) => {
  //   e.preventDefault()
  // }

  render() {
    const {data, product: { subProductId, colorId } } = this.props;
    const { loading, product } = data;
    if (loading == true || subProductId === null) {
      return <Loading/>
    }
    const { brand, images, subProducts } = product;
    const activeSubProduct = getActiveSubProduct(subProducts, subProductId);

    return (
      <div style={{ textAlign:"left" }}>
        <Images images={images} />
        <ProductTabs dataProduct={product} activeSubProduct={activeSubProduct} activeColor={colorId}/>
        <Flex style={{display: "flex", alignItems: "flex-end", width: "100%", position: "fixed", bottom: 0, zIndex: 1 }}>
            <Ripples
                style={{
                  backgroundColor: '#fb039e',
                  color: '#f1f901',
                  textAlign: 'center',
                  height: '0.7rem',
                  lineHeight: '0.6rem',
                  width: '100%'
                }}>{parseInt(activeSubProduct.price)} грн
            </Ripples>
            <Ripples
              style={{
                  backgroundColor: '#0379FF',
                  color: '#f7f7ae',
                  textAlign: 'center',
                  height: '0.7rem',
                  lineHeight: '0.6rem',
                  width: '100%'
                }}
            >Купить
            </Ripples>
        </Flex>
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
