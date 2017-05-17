import * as React from "react";

import { Button, Card, Flex } from "antd-mobile";

import {Images} from "../../product/index";
import { Link } from "react-router-dom";

const scaleImageSize = (width, height) => {
  const ratio = window.innerWidth / 2.4 / 360;
  // const ratio = maxWidth / width;
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

  let cardPadding: number;
  let borderRadius: number;
  let cardWidth: number;
  if (window.innerWidth <= 640) {
    cardPadding = 10;
    borderRadius = 4;
    cardWidth = Math.round(window.innerWidth / 2) - 22;
  } else if (window.innerWidth <= 750) {
    cardPadding = 14;
    borderRadius = 6;
    cardWidth = Math.round(window.innerWidth / 2) - 28;
  } else {
    cardPadding = 15;
    borderRadius = 8;
    cardWidth = Math.round(window.innerWidth / 2) - 32;
  }

  return (
    <div style={{
      dispalay: "block",
      width: cardWidth,
      border: "1px solid lightgrey",
      boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      borderRadius: borderRadius,
      background: "white",
    }}>
      <div style={{padding: cardPadding}}>
        <Link to={url} style={{display: "block", textAlign: "center"}}>
          <img
            height={scaleImageSize(titleImage.width, titleImage.height).height}
            src={titleImage.image}
          />
        </Link>
        <div style={{lineHeight: "0.25rem", fontSize: "0.25rem", marginTop: cardPadding}}>
          <Link to={url}>
            {id}
            {name}
            <br/>
            {brand.name} {subProduct.article}
          </Link>
        </div>
        <div style={{fontWeight: "bold", fontSize: "0.3rem", color: "#468847", marginTop: cardPadding}} >
          <div>{ onePrice ? "от " : "" }{parseInt(minPrice)} грн</div>
        </div>
      </div>
    </div>
  )
}

export default Product;
