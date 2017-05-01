import * as React from "react";
import { gql, compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Images } from "../index";
import { PRODUCT_QUERY } from "../../catalog/model";

interface ConnectedProductProps {
  data?: any;
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

class Product extends React.Component<ConnectedProductProps, ProductProps> {
  render() {
    const { loading, product } = this.props.data;
    if (loading == true) {
      return <div>Loading...</div>
    }
    const { brand, images, subProducts } = product;
    const sProduct = subProducts[0];
    return (
      <div>
        <Images images={images}/>
        <h2>{product.name} {brand.name} {sProduct.article}</h2>
        <div>
          {sProduct.price} грн
          <br/>
          <div style={{textDecoration: "line-through"}}>
            {sProduct.oldPrice} грн
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps: any = (state) => ({
})

export default compose(
    connect<ConnectedProductProps, {}, ProductProps>(mapStateToProps),
    graphql(PRODUCT_QUERY, options),
)(Product);
