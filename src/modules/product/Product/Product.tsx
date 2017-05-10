import * as React from "react";

import {Button, Flex} from "antd-mobile";
import { compose, gql, graphql } from "react-apollo";

import { Images } from "../index";
import {Loading} from "../../layout/index";
import { PRODUCT_QUERY } from "../../catalog/model";
import { connect } from "react-redux";

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
      return <Loading/>
    }
    const { brand, images, subProducts } = product;
    const sProduct = subProducts[0];
    const ArticleSubProduct = subProducts.map(el => el.article);
    console.log("subProduct", ArticleSubProduct.map(el => el));

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
        <Flex>
          <Flex.Item>
            <Button><a href="tel:+380661983831">Позвонить</a></Button>
          </Flex.Item>
          <Flex.Item>
            <Button>Купить</Button>
          </Flex.Item>
        </Flex>
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
