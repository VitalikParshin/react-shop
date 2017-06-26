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

interface IConnectedTabProps {
  product: ICurrentDataProduct;
  dispatch: any;
}

interface ITabsProps {
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

class ProductTabs extends React.Component<IConnectedTabProps & ITabsProps,  any> {

  public changeColor = (colorId) => {
    this.props.dispatch({type: ACTION_SELECT_COLOR, colorId });
  }

  public render() {
    const {dataProduct, product, activeSubProduct, dispatch} = this.props;
    const { brand, images, subProducts,  attributes } = dataProduct;
    const {subProductId, colorId} = this.props.product;

    return (
        <Tabs
          animated
          swipeable={false}
          onChange={callback}
          onTabClick={handleTabClick}
        >
          <TabPane className={styles.firstTabPane} tab="Инфо" key="1">
            <div className={styles.tabPaneArea}>
              <WingBlank size="md" style={{display: "flex", flexDirection: "column", paddingTop: "10px"}}>
                <div>{dataProduct.name} {brand.name}</div>
                <div className={styles.availability}>Eсть в наличии</div>
                <div className={styles.productCode}>
                  {`Код товара: ${activeSubProduct.id}`}
                </div>
              </WingBlank>

              {/* Select Sizes */}
              {subProducts.length > 1 ? <SelectSize subProducts={subProducts} /> : ""}
              <WhiteSpace/>

              {/* Select Colors*/}
              <WingBlank>
                {
                  images.filter((el) => el.color !== "").length > 1
                  ?
                  <Flex>
                    <Icon type={require("svg-sprite-loader!./product-sizes.svg")} style={{color: "#1296db"}}/>
                    <div style={{color: "#1296db"}}>Выберите цвет :</div>
                    <div>
                      { images.filter((el) => el.color !== "").map((e, i) =>
                          e.id === this.props.product.colorId ?
                        <Icon
                            key={i}
                            type={require("svg-sprite-loader!./circle-check_color.svg")}
                            style={{fill: e.color, color: e.color}}
                        />
                        :
                        <Icon
                            key={i}
                            onClick={() => this.changeColor(e.id)}
                            type={require("svg-sprite-loader!./icon-circle-for-colors.svg")}
                            style={{fill: e.color, color: e.color}}
                        />,
                      )}
                    </div>
                  </Flex>
                  :
                  <Flex>
                      <Icon type={require("svg-sprite-loader!./product-sizes.svg")}  style={{color: "#1296db"}}/>
                      <div style={{color: "#1296db"}}>Цвет : </div>
                      {images.filter((el) => el.color !== "").map((e, i) =>
                        <Icon
                            key={i}
                            type={require("svg-sprite-loader!./check-circle.svg")}
                            style={{fill: e.color, color: e.color}}
                        />,
                      )}
                  </Flex>
                }
              </WingBlank>
              <hr/>

              {/* Characteristics */}
              <List className="my-list" renderHeader={ () => {
                return (
                  <Flex style={{ color: "#1296db"}}>
                    <Icon type={require("svg-sprite-loader!./detail.svg")}/>
                    Характеристики :
                  </Flex>
                );
              }}>
                {attributes.map((el, index) =>
                  <List.Item
                    key={index}
                    extra={el.values.map((v) => v.name).join(", ")}
                    style={{fontSize: "12px"}}>{el.name}
                  </List.Item>,
                )}

                { subProducts.length <= 1 ?
                  // <Size dataProduct={dataProduct} />
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
                      Размер (Ш x В x Г) :
                    </List.Item>,
                  )
                  :
                   ""
                }
              </List>

              {/* About Product */}
              <List className="my-list" renderHeader={() => {
                return (
                  <Flex style={{ color: "#1296db"}}>
                    <Icon type={require("svg-sprite-loader!./info.svg")} />
                    <div>О ТОВАРЕ</div>
                  </Flex>
                );
              }}>
                <List.Item>
                  <div
                      dangerouslySetInnerHTML={createMarkup(dataProduct.description)}
                      style={{fontSize: "30px"}} />
                </List.Item>
              </List>
            </div>
          </TabPane>
          <TabPane tab="Характеристика" key="2">
            <div
              style={{
                alignItems: "center",
                backgroundColor: "#fff" ,
                display: "flex",
                height: "5rem",
                justifyContent: "center",
              }}
            >
              характеристика
            </div>
          </TabPane>
        </Tabs>
    );
  }
}

const mapStateToProps: any = (state) => ({
  product: state.product,
});

export default compose(
    connect<IConnectedTabProps, {}, ITabsProps>(mapStateToProps),
)(ProductTabs);
