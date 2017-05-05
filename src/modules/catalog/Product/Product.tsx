import * as React from "react";
import { Card, Button, Flex } from "antd-mobile";
import {Images} from "../../product/index";
import { Link } from "react-router-dom";


const scaleImageSize = (width, height, maxWidth) => {
  const ratio = maxWidth / width;
  return {
    width: width * ratio,
    height: height * ratio,
  }
}

// <Images images={images}/>
const Product = (props) => {
  const { id, name, titleImage, subProducts, i } = props;
  const subProduct = subProducts[0];
  const url = `/product/${id}`;

  return (
    <div style={{
      dispalay: "block",
      width: "49%",
      marginTop: 10,
      border: "1px solid lightgrey",
      boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      borderRadius: 3,
      background: "white",
    }}>
      <div style={{padding: 10}}>
        <Link to={url} style={{display: "block", textAlign: "center"}}>
          <img
            height={scaleImageSize(titleImage.width, titleImage.height, screen.width * 2 / 2.5).height}
            src={titleImage.image}
          />
        </Link>
        <div>
          <Link to={url} style={{fontSize: "0.2rem"}}>
            {props.name} { subProduct.article }
          </Link>
        </div>
        <div style={{fontWeight: "bold", fontSize: "0.3rem"}}>
          { subProduct.price } грн
        </div>
      </div>
    </div>
  )
}

export default Product;
