import {
  Button,
  Card,
  Flex,
  Icon,
  WhiteSpace,
  WingBlank,
} from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";
import Ripples from "react-ripples";
import { Link } from "react-router-dom";
import { Image, Images, scaleImageSize } from "../../product/index";
import {IBrand, IImageWithColor, IProduct, ISubProduct} from "../../product/model";
import {ICatalog} from "../model";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

const getMinOfArray = (numArray) => {
  return Math.min.apply(null, numArray);
};

interface IConnectedProductProps {
  catalog: ICatalog;
}

interface IProductProps {
  key: number;
  id: string;
  name: string;
  subProducts: [ISubProduct];
  brand: IBrand;
  imagesWithColor: [IImageWithColor];
}

// class Product extends React.Component<IConnectedProductProps & IProductProps, any> {
class Product extends React.Component<any, any> {

  public state = {
    titleImage: {},
  };

  constructor(props) {
    super(props);
    const {imagesWithColor}  = this.props;
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
    let width = Math.round(window.innerWidth / 2);
    if (window.innerWidth <= 640) {
      cardPadding = 10;
      borderRadius = 4;
      width -= 22;
    } else if (window.innerWidth <= 750) {
      cardPadding = 14;
      borderRadius = 6;
      width -= 28;
    } else {
      cardPadding = 15;
      borderRadius = 8;
      width -= 32;
    }

    const maxImageHeight = Math.max(
      ...imagesWithColor.map((img) => scaleImageSize(img.width, img.height).height),
    );

    return (
      <div
          className={styles.root}
          style={{
            border: `1px solid ${this.isViewed() ? "orange" : "lightgrey"}`,
            borderRadius,
            width,
          }}
      >
        {this.isViewed() ? (
          <div style={{position: "absolute", top: 3, left: 10}}>
            <Icon
              type={require("!svg-sprite-loader!./viewed.svg")}
              size="sm"
              style={{fill: "orange"}}
            />
          </div>
        ) : ""}

        <WhiteSpace size="sm" />
          <div style={{ padding: cardPadding }}>
            <Link
              to={{
                pathname: url,
                state: { modal: true },
              }}
            >
              <div
                className={styles.imageContainer}
                style={{height: maxImageHeight}}
              >
                <img src={titleImage.src}/>
              </div>
            </Link>

            {/*<Images images={imagesWithColor}/>*/}

            {/* Images */}
            {imagesWithColor.length > 1 ?
              (
                <Flex justify="center">
                  {imagesWithColor.map((image, i) => (
                    <Icon
                      key={i}
                      type={require("!svg-sprite-loader!./dot.svg")}
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
              <div>{isSinglePrice ? "" : "от "}{parseInt(minPrice, 10)} грн</div>
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

// export default connect<IConnectedProductProps, {}, IProductProps>(mapStateToProps)(Product);
export default connect<any, any, any>(mapStateToProps)(Product);
