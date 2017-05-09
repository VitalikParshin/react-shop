import * as React from "react";

import { Button, Card, Flex } from "antd-mobile";

import {Images} from "../../product/index";
import { Link } from "react-router-dom";

const scaleImageSize = (width, height, maxWidth) => {
  const ratio = maxWidth / width;
  return {
    width: width * ratio,
    height: height * ratio,
  }
}

const getMinOfArray = (numArray) => {
  return Math.min.apply(null, numArray);
}

// <Images images={images}/>
const Product = (props) => {
  const { id, name, titleImage, subProducts, brand, i } = props;
  const subProduct = subProducts[0];
  const url = `/product/${id}`;
  const prices = subProducts.map(el => el.price);
  const onePrice = prices.length === 1;
  const minPrice = getMinOfArray(prices);
  return (
    <div style={{
      dispalay: "block",
      width: "49%",
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
        <Link to={url} style={{fontSize: "0.2rem"}}>
            <div style={{ color: "#08c", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} >
              <div style={{width: "50%" }}>{brand.name}</div>
              <div style={{width: "50%", textAlign: "right" }}>{subProduct.article}</div>
            </div>
        </Link>
        <div style={{fontWeight: "bold", fontSize: "0.3rem", color: "#468847"}} >
          { onePrice ?
            <div>{minPrice} грн</div>
              :
            <div>от {minPrice} грн</div>
          }
        </div>
      </div>
    </div>
  )
}

export default Product;
