import * as React from "react";
import { connect } from "react-redux";
import {ACTION_SELECT_COLOR, ACTION_SELECT_SUBPRODUCT} from "../constants";

import { Button, Flex } from "antd-mobile";
import { compose, gql, graphql } from "react-apollo";
import Ripples from "react-ripples";

import {ACTION_ADD_VIEWED_PRODUCT} from "../../catalog/constants";
import {Loading} from "../../layout/index";
import {Images, ProductTabs } from "../index";
import {ICurrentDataProduct, IProduct, PRODUCT_QUERY} from "../model";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

interface IData {
  loading: boolean;
  product: IProduct;
}

interface IConnectedProductProps {
  data: IData;
  product: ICurrentDataProduct;
  dispatch: any;
}

interface IProductProps {
  id: string;
}

const options = {
  options: (props) => ({
    variables: {
      id: props.id,
    },
  }),
};

const getActiveSubProduct = (subProducts, subProductId) => {
  return subProducts.filter((sp) => sp.id === subProductId)[0] || subProducts[0];
};

function createMarkup(html) {
  return {__html: html};
}

class Product extends React.Component<IConnectedProductProps & IProductProps, any> {

  constructor(props) {
    super(props);
    const { dispatch, id } = props;
    dispatch({type: ACTION_ADD_VIEWED_PRODUCT, productId: id });
  }

  public componentWillReceiveProps = (nextProps) => {
    const { data } = nextProps;
    const { loading, product } = data;
    if (loading === false) {
      const { subProducts } = product;
      const { subProductId } = nextProps.product;
      const subProductIds = subProducts.map((sp) => sp.id);
      const subProductColor = product.images[0].id;
      if (subProductIds.indexOf(subProductId) === -1) {
        this.props.dispatch({
          colorId: subProductColor,
          subProductId: subProductIds[0],
          type: ACTION_SELECT_SUBPRODUCT,
        });
      }
    }
  }

  public render() {
    const { data } = this.props;
    const { loading, product } = data;
    const {subProductId, colorId} = this.props.product;
    if (loading === true || subProductId === null) {
      return <Loading/>;
    }
    const { brand, images, subProducts } = product;
    const activeSubProduct = getActiveSubProduct(subProducts, subProductId);

    return (
      <div className={styles.product}>
        <Images images={images} />
        <ProductTabs dataProduct={product} activeSubProduct={activeSubProduct} />
        <Flex className={styles.buy}>
          <Ripples className={styles.buyPrice}>
            {parseInt(activeSubProduct.price, 10)} грн
          </Ripples>
          <Ripples className={styles.buyButton}>
            Купить
          </Ripples>
        </Flex>
      </div>
    );
  }
}

const mapStateToProps: any = (state) => ({
  product: state.product,
});

export default compose(
    connect<IConnectedProductProps, {}, IProductProps>(mapStateToProps),
    graphql(PRODUCT_QUERY, options),
)(Product);
