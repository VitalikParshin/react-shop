import * as React from "react";

import { Button, Flex } from "antd-mobile";
import { compose, gql, graphql } from "react-apollo";

import {Images, ProductTabs} from "../index";
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

function createMarkup(html) {
  return {__html: html};
}

class Product extends React.Component<ConnectedProductProps, ProductProps> {
  render() {
    const { loading, product } = this.props.data;
    if (loading == true) {
      return <Loading/>
    }
    const { brand, images, subProducts } = product;
    const sProduct = subProducts.map(el => el);

    const firstProduct = sProduct[0];
    console.log("shortDescription : ", product.description);
    // const sProduct = subProducts[0];
    const ArticleSubProduct = subProducts.map(el => el.article);
    console.log("subProduct", ArticleSubProduct.map(el => el));

    return (
      <div>
        <Images images={images}/>
        <h3>
          <div>
            {product.name + " "}
            {brand.name}
          </div>
          <div style={{color: "#b94a48"}}>
            {`Код товара: ${firstProduct.id}`}
          </div>
        </h3>
        <ProductTabs/>
        <hr/>
        <div style={{marginTop: "60px"}} className="am-wingblank am-wingblank-lg">

          <div style={{color: "green", fontSize: "24px"}}>Eсть в наличии</div>

          <hr/>
          <Flex>
            <div style={{fontSize: "40px",}}>{sProduct[0].price} грн</div>
            <div style={{textDecoration: "line-through", fontSize: "24px"}}>{sProduct[0].oldPrice} грн</div>
            <Button>Купить</Button>
          </Flex>
          <hr/>
          <div>
            {sProduct.map(el =>
              <div >
                <div style={{fontSize: "40px",}}>{el.price} грн</div>
                <div style={{textDecoration: "line-through", fontSize: "24px"}}>{el.oldPrice} грн</div>
              </div>
            )}
          </div>

          <br/>
          <div className="article">
            <a>Артикул:</a>
            {sProduct.map(el =>
              <div>{el.article}</div>
            )}
          </div>
          <div>Цвет: </div>
          <div>Количество: </div>

          <div dangerouslySetInnerHTML={createMarkup(product.description)}></div>
          <div>Характеристики товара: </div>
          <Flex>
            <Flex.Item>
              <Button><a href="tel:+380661983831">Позвонить</a></Button>
            </Flex.Item>
            <Flex.Item>
              <Button>Купить</Button>
            </Flex.Item>
          </Flex>
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
