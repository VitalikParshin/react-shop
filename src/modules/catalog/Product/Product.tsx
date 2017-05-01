import * as React from "react";
import {Card, Button} from "antd-mobile";
import {Images} from "../../product/index";
import { Link } from "react-router-dom";

// <Images images={images}/>
const Product = (props) => {
  const { id, name, titleImage } = props;
  return <Card>
    <div>
      <img src={titleImage.image}/>
    </div>
    
    <Link to={`/product/${id}`}>
      {props.name}
    </Link>

  </Card>
}

export default Product;