import * as React from "react";
import {Button, Card, Flex, Icon, WingBlank} from "antd-mobile";
import { Link } from "react-router-dom";
import {Images, Image} from "../../product/index";
import {scaleImageSize} from "../../product/Image/Image";
import Ripples from "react-ripples";

const getMinOfArray = (numArray) => {
  return Math.min.apply(null, numArray);
}

class Product extends React.Component<any,any> {
  state = {
    titleImage: {}
  }

  constructor(props) {
    super(props);
    const { images } = this.props;
    this.state = {
      titleImage: images.filter(img => img.isTitle)[0] || images[0]
    }
  }

  changeTitleImage = (e, image) => {
    this.setState({titleImage: image})
  }

  render() {
    const { id, name, subProducts, brand, images } = this.props;
    const { titleImage } = this.state as any;
    const subProduct = subProducts[0];
    const url = `/product/${id}`;
    const prices = subProducts.map(el => el.price);
    const isSinglePrice = prices.length === 1;
    const minPrice = getMinOfArray(prices);

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

    const maxImageHeight = Math.max(
      ...images.map(img => scaleImageSize(img.width, img.height).height)
    );
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
          <Link
              to={url}
              style={{
                display: "block",
                textAlign: "center",
                height: maxImageHeight,
              }}>
            <Image {...titleImage} />
          </Link>

          {images.length > 1 ?
            (
              <Flex
                  justify="center"
                  // wrap="wrap"
              >
                {images.map(image => (
                  <Icon
                    type={require("!svg-sprite!./dot.svg")}
                    size={image.id == titleImage.id ? "lg" : "md"}
                    style={{
                      fill: image.color,
                    }}
                    onClick={e => this.changeTitleImage(e, image)}
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
}

export default Product;
