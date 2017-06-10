import * as React from "react";

import {
  Button,
  Card,
  Flex,
  Icon,
  WhiteSpace,
  WingBlank,
} from "antd-mobile";

import { connect } from "react-redux";
import Ripples from "react-ripples";
import { Link } from "react-router-dom";
import { Image, Images, scaleImageSize } from "../../product/index";

const getMinOfArray = (numArray) => {
  return Math.min.apply(null, numArray);
};

class Product extends React.Component<any, any> {
  public state = {
    titleImage: {},
  };

  constructor(props) {
    super(props);
    const { imagesWithColor } = this.props;
    this.state = {
      titleImage: imagesWithColor.filter((img) => img.isTitle)[0] || imagesWithColor[0],
    };
  }

  public isViewed() {
    const {catalog, id} = this.props;
    return catalog.viewedProductIds.indexOf(id) !== -1;
  }

  public changeTitleImage = (e, image) => {
    this.setState({titleImage: image});
  }

  public render() {
    const { id, name, subProducts, brand, imagesWithColor, key, catalog } = this.props;
    const { titleImage } = this.state as any;
    const subProduct = subProducts[0];
    const url = `/product/${id}`;
    const prices = subProducts.map((el) => el.price);
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
      ...imagesWithColor.map((img) => scaleImageSize(img.width, img.height).height),
    );

    return (
      <div style={{
        background: "white",
        border: `1px solid ${this.isViewed() ? "orange" : "lightgrey"}`,
        borderRadius,
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        dispalay: "block",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        width: cardWidth,
      }}>

        {this.isViewed() ? (
          <div style={{position: "absolute", top: 3, left: 10}}>
            <Icon
              type={require("!svg-sprite!./viewed.svg")}
              size="sm"
              style={{fill: "orange"}}
            />
          </div>
        ) : ""}

        <WhiteSpace size="sm" />
        <div style={{ padding: cardPadding }}>
          <Link to={{
            pathname: url,
            state: { modal: true },
          }}>
            <Flex
                justify="center"
                align="center"
                style={{
                  height: maxImageHeight,
                }}
            >
              <img
                src={titleImage.src}
                style={{
                  height: "100%",
                  objectFit: "contain",
                  width: "100%",
                }}
              />
            </Flex>
          </Link>

          {/*<Images images={imagesWithColor}/>*/}

          {/* Images */}
          {imagesWithColor.length > 1 ?
            (
              <Flex
                  justify="center"
              >
                {imagesWithColor.map((image) => (
                  <Icon
                    type={require("!svg-sprite!./dot.svg")}
                    size={image.id === titleImage.id ? "lg" : "md"}
                    style={{
                      fill: image.color,
                    }}
                    onClick={(e) => this.changeTitleImage(e, image)}
                  />
                ))}
              </Flex>
            ) : ""
          }
          <div style={{lineHeight: "0.25rem", fontSize: "0.25rem", marginTop: cardPadding}}>
            {name}
            <br/>
            {brand.name} {subProduct.article}
          </div>
          <div style={{fontWeight: "bold", fontSize: "0.3rem", color: "#468847", marginTop: cardPadding}} >
            <div>{ isSinglePrice ? "" : "от " }{ parseInt(minPrice, 10) } грн</div>
          </div>
        </div>
        <WhiteSpace size="sm" />
      </div>
    );
  }
}

const mapStateToProps: any = (state) => ({
  catalog: state.catalog,
});

export default connect<any, {}, any>(mapStateToProps)(Product);
