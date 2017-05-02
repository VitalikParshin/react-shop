import * as React from "react";
import {Card, Button, Flex} from "antd-mobile";
import {Images} from "../../product/index";
import { Link } from "react-router-dom";

// <Images images={images}/>
const Product = (props) => {
  const { id, name, titleImage, subProducts } = props;
  const subProduct = subProducts[0];
  const url = `/product/${id}`;
  return (
    <div style={{float: "left", width: "50%"}}>
      <div style={{margin: 5}}>
        <Card>
          <div style={{height:400, padding: 10}}>
            <Link to={url}>
              <Flex justify="center" style={{ height: 320 }}>
                <img style={{ maxWidth: 250, maxHeight: 300 }} src={titleImage.image}/>
              </Flex>
            </Link>

            <Link to={url} style={{fontSize: "0.2rem"}}>
              {props.name} { subProduct.article }
            </Link>
            <div style={{fontWeight: "bold", fontSize: "0.3rem"}}>{ subProduct.price } грн</div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Product;
