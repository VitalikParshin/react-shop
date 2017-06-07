import * as React from "react";
import {ACTION_SELECT_SUBPRODUCT, ACTION_SELECT_COLOR} from "../constants";

import {
  Button,
  Flex,
  Tabs,
  WhiteSpace,
  WingBlank,
  Table,
  Icon,
  List,
  Radio,
  Checkbox,
} from "antd-mobile";

import {compose, gql, graphql} from "react-apollo";

import { Images, SelectSize, Size } from "../index";
import { Loading } from "../../layout/index";
import { PRODUCT_QUERY } from "../../catalog/model";
import { connect } from "react-redux";

const TabPane = Tabs.TabPane;
const FlexItem = Flex.Item;
const ListItem = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

interface ConnectedTabProps {
  dataProduct: any;
  data?: any;
  product: any;
  dispatch: any;
};

interface TabsProps {
  dataProduct: any;
  activeSubProduct: any;
  activeColor: any;
};

const options = {
  options: props => ({
    variables: {
      id: props.id
    }
  })
};

function createMarkup(html) {
  return {__html: html};
}

function callback(key) {
  console.log('onChange', key);
}
function handleTabClick(key) {
  console.log('onTabClick', key);
}

class ProductTabs extends React.Component<ConnectedTabProps & TabsProps,  any> {

  changeColor = (colorId) => {
    this.props.dispatch({type: ACTION_SELECT_COLOR, colorId: colorId})
  }

  checkOn() {
    this.setState({
      id: "",
      check: "check"
    })
  }

  render() {
    const dataProduct = this.props.dataProduct;
    const { activeSubProduct } = this.props;
    const { brand, images, subProducts,  attributes} = dataProduct;
    console.log("subProductId", this.props.product.subProductId, "colorId", this.props.product.colorId)

    return (
        <Tabs
          animated
          onChange={callback}
          onTabClick={handleTabClick}
        >
          <TabPane tab="Инфо" key="1" style={{marginBottom: "30px"}}>
            <div style={{backgroundColor: "#fff" }}>
              <WingBlank size="md" style={{display: "flex", flexDirection: "column", paddingTop: "10px"}}>
                <div>{dataProduct.name} {brand.name}</div>
                <div style={{color: "green", fontSize: "24px"}}>Eсть в наличии</div>
                <div style={{color: "#b94a48", fontSize: "24px"}}>
                  {`Код товара: ${activeSubProduct.id}`}
                </div>
              </WingBlank>
              <WingBlank size="md">
                <hr/>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                  <div style={{width: "35%"}}>
                    <div style={{fontSize: "40px", color: "#468847"}}>{Math.trunc(activeSubProduct.price) } грн</div>
                    <div style={{textDecoration: "line-through", fontSize: "24px", color: "#b94a48"}}>{Math.trunc(activeSubProduct.oldPrice)} грн</div>
                  </div>
                  <div style={{width: "28%"}}>
                    <Icon
                      type={require('svg-sprite!./free-delivery.png')}
                      style={{width: "150px", height: "75px"}}
                    />
                  </div>
                  <div style={{width: "42%"}}>
                    <Button
                      className="btn"
                      style={{textColor: "white"}}
                      size="small"
                      icon={require('svg-sprite!./basket.svg')}
                    >
                      В корзину
                    </Button>
                  </div>
                </div>
              </WingBlank>
              <hr/>

              {/* Select Sizes */}
              {subProducts.length > 1 ? <SelectSize dataProduct={dataProduct} /> : '' }
              <WhiteSpace/>

              {/* Select Colors*/}
              <WingBlank>
                { images.filter( el => el.color !== "").length > 1 ?
                  <Flex>
                      <Icon type={require('svg-sprite!./product-sizes.svg')}  style={{color: "#1296db", }}/>
                      <div style={{color: "#1296db"}}>Выберите цвет :</div>
                    <div>
                      { images.filter( el => el.color !== "").map(e =>
                        e.id === this.props.activeColor ?
                        <Icon
                            type={require('svg-sprite!./circle-check_color.svg')}
                            style={{fill: e.color, color: e.color}}
                        />
                        :
                        <Icon
                            onClick={() => this.changeColor(e.id)}
                            type={require('svg-sprite!./icon-circle-for-colors.svg')}
                            style={{fill: e.color, color: e.color}}
                        />
                      )}
                    </div>
                  </Flex>
                  :
                  <Flex>
                      <Icon type={require('svg-sprite!./product-sizes.svg')}  style={{color: "#1296db", }}/>
                      <div style={{color: "#1296db"}}>Цвет : </div>
                      {images.filter( el => el.color !== "").map(e =>
                        <Icon
                              type={require('svg-sprite!./check-circle.svg')}
                              style={{fill: e.color, color: e.color}}
                        />
                    )}
                  </Flex>
                }
              </WingBlank>
              <hr/>

              {/* Characteristics */}
              <List className="my-list" renderHeader={ () => {
                return (
                  <Flex style={{ color: "#1296db"}}>
                    <Icon type={require('svg-sprite!./detail.svg')}/>
                    Характеристики :
                  </Flex>
                )
              }}>
                {attributes.map(el =>
                    <ListItem extra={el.values.map(v => v.name).join(", ")} style={{fontSize: "12px"}}>{el.name}</ListItem>
                )}

                { subProducts.length <= 1 ?
                  // <Size dataProduct={dataProduct} />
                  subProducts.map(el =>
                    <ListItem
                        extra={
                            el.attributes.length != 0
                            ? el.attributes.slice(0, 3).map(e => e.values.map(i => i.value) ).join("x") + " " + el.attributes.slice(5, 6).map(e => e.values.map(i => i.name))
                            : el.article
                          }
                    >
                      Размер (Ш x В x Г) :
                    </ListItem>
                  )
                  :
                   ""
                }
              </List>

              {/* about Product*/}
              <List className="my-list" renderHeader={() => {
                return (
                  <Flex style={{ color: "#1296db"}}>
                    <Icon type={require('svg-sprite!./info.svg')} />
                    <div>О ТОВАРЕ</div>
                  </Flex>
                )
              }}>
                <ListItem>
                  <div
                      dangerouslySetInnerHTML={createMarkup(dataProduct.description)}
                      style={{fontSize: "30px"}} />
                </ListItem>
              </List>
            </div>
          </TabPane>
          <TabPane tab="Характеристика" key="2">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              характеристика
            </div>
          </TabPane>
        </Tabs>
    )
  }
}

const mapStateToProps: any = (state) => ({
  product: state.product
})

export default compose(
    connect<ConnectedTabProps, {}, TabsProps>(mapStateToProps),
)(ProductTabs);
