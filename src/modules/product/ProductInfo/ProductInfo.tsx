import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";

import { ACTION_SELECT_COLOR, ACTION_SELECT_SUBPRODUCT } from "../constants";

import {
  Button,
  Checkbox,
  Flex,
  Icon,
  List,
  Radio,
  Table,
  Tabs,
  WhiteSpace,
  WingBlank,
} from "antd-mobile";

import { Loading } from "../../layout/index";
import { Images, SelectSize } from "../index";
import { ICurrentDataProduct, IProduct, ISubProduct } from "../model";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

const { TabPane } = Tabs;
const { AgreeItem, CheckboxItem } = Checkbox;

interface IConnectedProductInfoProps {
  product: ICurrentDataProduct;
  dispatch: any;
}

interface IProductInfoProps {
  dataProduct: IProduct;
  activeSubProduct: ISubProduct;
}

const options = {
  options: (props) => ({
    variables: {
      id: props.id,
    },
  }),
};

function createMarkup(html) {
  return {__html: html};
}

function callback(key) {
  // tslint:disable-next-line:no-console
  console.log("onChange", key);
}

function handleTabClick(key) {
  // tslint:disable-next-line:no-console
  console.log("onTabClick", key);
}

class ProductInfo extends React.Component<IConnectedProductInfoProps & IProductInfoProps,  any> {

  public changeColor = (colorId) => {
    this.props.dispatch({type: ACTION_SELECT_COLOR, colorId });
  }

  public render() {
    const {dataProduct, product, activeSubProduct, dispatch} = this.props;
    const { brand, images, subProducts,  attributes } = dataProduct;
    const {subProductId, colorId} = this.props.product;

    return (
      <div className={styles.tabPaneArea}>
        <WingBlank size="lg" style={{display: "flex", flexDirection: "column", paddingTop: "10px"}}>
          <div>{dataProduct.name} {brand.name}</div>
        </WingBlank>

        {/* Select Sizes */}
        {subProducts.length > 1 ? <SelectSize subProducts={subProducts} /> : ""}
        <WhiteSpace/>

        {/* Select Colors*/}
        <Flex>
          <div className={styles.tabTitle}>Цвет</div>
          {
            images.filter((el) => el.color !== "").length > 1
            ?
              images.filter((el) => el.color !== "").map((e, i) =>
                e.id === this.props.product.colorId
                ?
                <Icon
                    key={i}
                    type={require("svg-sprite-loader!./circle-check_color.svg")}
                    style={{fill: e.color, color: e.color, marginLeft: "0.1rem"}}
                />
                :
                <Icon
                    key={i}
                    onClick={() => this.changeColor(e.id)}
                    type={require("svg-sprite-loader!./icon-circle-for-colors.svg")}
                    style={{fill: e.color, color: e.color, marginLeft: "0.1rem"}}
                />,
              )
            :
              images.filter((el) => el.color !== "").map((e, i) =>
                <Icon
                    key={i}
                    type={require("svg-sprite-loader!./check-circle.svg")}
                    style={{
                      fill: e.color,
                      color: e.color,
                      marginLeft: "0.1rem",
                    }}
                />,
              )
          }
        </Flex>

        <hr/>

        <div className={styles.tabTitle}>Характеристики</div>
        <div style={{marginTop: "0.2rem"}}>
          {attributes.map((el, index) =>
            <WingBlank key={index}>
              <Flex direction="row" justify="between">
                <div className={styles.characteristicName}>{el.name}</div>
                <div className={styles.characteristicValue}>{el.values.map((v) => v.name).join(", ")}</div>
              </Flex>
            </WingBlank>,
          )}

          {
            subProducts.length === 1
            ?
            subProducts.map((el, i) =>
              <List.Item
                  key={i}
                  extra={
                    el.attributes.length !== 0
                    ? el.attributes.slice(0, 3).map((e) => e.values.map((v) => v.value) ).join("x") +
                      " " + el.attributes.slice(5, 6).map((e) => e.values.map((v) => v.name))
                    : el.article
                  }
              >
                Размер, ШxВxГ
              </List.Item>,
            )
            : ""
          }
        </div>

        {/* About Product */}
        <hr/>
        <div className={styles.tabTitle}>О товаре</div>
        <WingBlank>
          <div
            className={styles.dangerouslySetInnerHTML}
            dangerouslySetInnerHTML={createMarkup(dataProduct.description)}
          />
        </WingBlank>
      </div>
    );
  }
}

const mapStateToProps: any = (state) => ({
  product: state.product,
});

export default compose(
    connect<IConnectedProductInfoProps, {}, IProductInfoProps>(mapStateToProps),
)(ProductInfo);
