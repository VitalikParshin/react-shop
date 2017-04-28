import * as React from "react";
import { Card } from "antd-mobile";
import { Images } from "../../product/index";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { id, shortName, images, subProducts } = props;
  const subproduct = subProducts[0];
  return <Card>
    <Images images={images}/>
    <Link to={`/product/${subproduct.id}`}>
      {props.shortName}
    </Link>
  </Card>
}

export default Product;