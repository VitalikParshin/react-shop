import * as React from "react";

import {Button, Card, Flex, Icon, WingBlank} from "antd-mobile";

import { Link } from "react-router-dom";
import {Images, Image} from "../../product/index";
import {scaleImageSize} from "../../product/Image/Image";

const getMinOfArray = (numArray) => {
  return Math.min.apply(null, numArray);
}

const Product = (props) => {
  const { id, name, subProducts, brand, images } = props;
  const subProduct = subProducts[0];
  const url = `/product/${id}`;
  const prices = subProducts.map(el => el.price);
  const isSinglePrice = prices.length === 1;
  const minPrice = getMinOfArray(prices);
  const titleImage = images.filter(img => img.isTitle)[0] || images[0];

  let cardPadding: number;
  let borderRadius: number;
  let cardWidth = Math.round(window.innerWidth / 2);
  if (window.innerWidth <= 640) {
    cardPadding = 10;
    borderRadius = 4;
    cardWidth -= 22;
  } else if (window.innerWidth <= 750) {
    cardPadding = 14;
    borderRadius = 6;
    cardWidth -= 28;
  } else {
    cardPadding = 15;
    borderRadius = 8;
    cardWidth -= 32;
  }

  let _colorsSet: string[] = [];
  let imageSet: any[] = [];
  for (let image of images) {
    if (_colorsSet.indexOf(image.color) === -1) {
      _colorsSet.push(image.color);
      imageSet.push(image);
    }
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
      <WingBlank size="lg" />
      <div style={{padding: cardPadding}}>
        <Link to={url} style={{display: "block", textAlign: "center"}}>
          <Image {...titleImage} />
        </Link>

        {imageSet.length > 1 ?
          (
            <Flex justify="center" wrap="wrap">
              {imageSet.map(image => (
                <Icon
                  type={require("!svg-sprite!./dot.svg")}
                  size="md"
                  style={{fill: image.color}}
                />
              ))}
            </Flex>
          ) : ""
        }

        {/*<Images images={images} />*/}
        <div style={{lineHeight: "0.25rem", fontSize: "0.25rem", marginTop: cardPadding}}>
          <Link to={url}>
            {id}
            {name}
            <br/>
            {brand.name} {subProduct.article}
          </Link>
        </div>
        <div style={{fontWeight: "bold", fontSize: "0.3rem", color: "#468847", marginTop: cardPadding}} >
          <div>{ isSinglePrice ? "от " : "" }{parseInt(minPrice)} грн</div>
        </div>
      </div>
      <WingBlank size="lg" />
    </div>
  )
}

export default Product;
