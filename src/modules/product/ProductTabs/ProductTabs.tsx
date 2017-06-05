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

import { Images, SelectSize } from "../index";
import { Loading } from "../../layout/index";
import { PRODUCT_QUERY } from "../../catalog/model";
import { connect } from "react-redux";

const TabPane = Tabs.TabPane;
const Item = Flex.Item;
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


class Size extends React.Component<any, any>{
  render(){
    return <div>This page in developering....</div>
  }
}


class ProductTabs extends React.Component<ConnectedTabProps & TabsProps,  any> {
    constructor(props){
      super(props)
      this.state = {
        style: {
          background: "#108ee9"
        },
        price: "123445",
        check: ''
      }
    }

  changeColor() {
    this.setState({
      style: {background: "#0d7ccc"}
    })
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
    const image = images.map(el => el.color);

  return (
      <div style={{marginBottom: "60px"}}>
        <Images images={images} />
        <WhiteSpace size="md" />

        <Flex style={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            zIndex: 1,
            textAlign: "center",
        }}>
          <div style={{
              backgroundColor: '#ebebef',
              color: 'black',
              width: '50%',
              lineHeight: '0.6rem',
          }}>{parseInt(activeSubProduct.price)} грн
          </div>
          <div
              style={{
                backgroundColor: this.state.style.background,
                color: '#f7f7ae',
                width: '50%',
                lineHeight: '0.6rem',
              }}
              onClick={this.changeColor.bind(this)}
              >Купить
          </div>
        </Flex>

        <Tabs
          animated
          onChange={callback}
          onTabClick={handleTabClick}
          pageSize={3}
        >
          <TabPane tab="Инфо" key="1">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff" }}>
              <div className="am-wingblank am-wingblank-lg">
                <div style={{display: "flex", flexDirection: "column", paddingTop: "10px"}}>
                  <div>{dataProduct.name} {brand.name}</div>
                  <div style={{color: "green", fontSize: "24px"}}>Eсть в наличии</div>
                  <div style={{color: "#b94a48", fontSize: "24px"}}>
                    {`Код товара: ${activeSubProduct.id}`}
                  </div>
                </div>
                <div style={{marginTop: "100px"}}>
                  Image Caruosel
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
                </div>
                <hr/>

                {/* Select Colors */}
                <div style={{display: "flex", alignItems: "flex-end"}}>
                  <Icon type={require('svg-sprite!./product-sizes.svg')}  style={{color: "#1296db", }}/>
                  <div style={{color: "#1296db"}}>Выберите цвет :</div>
                </div>
                <Flex direction="row" justify="around" >
                  {images.map(el =>
                    <div>
                      <WhiteSpace />
                      <div style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "16px",
                            backgroundColor: el.color,
                            cursor: "pointer"
                          }}
                          onClick={this.checkOn.bind(this)}>
                          <Icon type={this.state.check} style={{color: "white"}} />
                      </div>
                      {1 == 1 ? 1 : 2 }
                      <WhiteSpace />
                    </div>
                  )}

                </Flex>
                <hr/>

                {/* Select Sizes */}

                {subProducts.length <= 1 ? <Size /> : <SelectSize dataSubProducts={subProducts}/> }

                {/* Characteristics */}

                <List className="my-list" renderHeader={ () => {
                  return (
                    <div style={{color: "#1296db"}}>
                      <div style={{display: "flex", alignItems: "flex-end"}}>
                        <Icon type={require('svg-sprite!./detail.svg')}/>
                        Характеристики :
                      </div>
                    </div>
                  )
                }}>
                  {attributes.map(el =>
                      <List.Item extra={el.values.map(v => v.name).join(", ")} style={{fontSize: "12px"}}>{el.name}</List.Item>
                  )}
                </List>
                <hr/>

                {/* about Product*/}
                <div style={{color: "#1296db", display: "flex", alignItems: "flex-end"}}>
                  <Icon type={require('svg-sprite!./info.svg')} style={{}}/>
                  <div>О ТОВАРЕ</div>
                </div>
                <div
                  dangerouslySetInnerHTML={createMarkup(dataProduct.description)}
                  style={{fontSize: "30px"}} />
              </div>
            </div>
          </TabPane>
          <TabPane tab="Характеристика" key="2">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
              характеристика
            </div>
          </TabPane>
          <TabPane tab="Размеры" key="3">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <WingBlank size="lg">
                  {subProducts.map(el =>
                    <div>
                      <div>
                        {el.attributes.map(e =>
                          <div>
                            {e.name} - {e.values.map(v =>
                                v.value
                              )}
                          </div>
                        )}
                      </div>
                      <div style={{color: "#468847", fontSize: "30px", textAlign: "right"}}>Цена: {el.price} грн</div>
                      <Button type="primary">Купить</Button>
                      <WhiteSpace size="lg"></WhiteSpace>
                    </div>
                  )}
                </WingBlank>
            </div>
          </TabPane>
        </Tabs>
        <WhiteSpace />
      </div>
    )
  }
}

const mapStateToProps: any = (state) => ({
  product: state.product
})

export default compose(
    connect<ConnectedTabProps, {}, TabsProps>(mapStateToProps),
)(ProductTabs);
