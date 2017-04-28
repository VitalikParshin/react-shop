import * as React from "react";
import { gql, compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Images } from "../index";
import { SUB_PRODUCT_QUERY } from "../../catalog/model";

interface ConnectedSubProductProps {
  data?: any;
};

interface SubProductProps {
};

const options = {
  options: props => ({
    variables: {
      filter: {
        id: "cj1xnfwfsvbol0144j67y60a6"
      }
    }
  })
};

class SubProduct extends React.Component<ConnectedSubProductProps, SubProductProps> {
  render() {
    const { loading, allSubProducts } = this.props.data;
    if (loading == true) {
      return <div>Loading...</div>
    }
    const sProduct = allSubProducts[0];
    const { product } = sProduct;
    const { brand, images } = product;
    return (
      <div>
        <Images images={images}/>
        <h2>{product.shortName} {brand.name} {sProduct.sku}</h2>
        <div>
          {sProduct.price} грн
          <br/>
          <div style={{textDecoration: "line-through"}}>
            {sProduct.priceOld} грн
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps: any = (state) => ({
})

export default compose(
    connect<ConnectedSubProductProps, {}, SubProductProps>(mapStateToProps),
    graphql(SUB_PRODUCT_QUERY, options),
)(SubProduct);
