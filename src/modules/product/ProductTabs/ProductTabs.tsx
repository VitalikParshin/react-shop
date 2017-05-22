import * as React from "react";

import {Button, Flex, Tabs, WhiteSpace} from "antd-mobile";
import {compose, gql, graphql} from "react-apollo";

import { Images } from "../index";
import { Loading } from "../../layout/index";
import { PRODUCT_QUERY } from "../../catalog/model";
import { connect } from "react-redux";

const TabPane = Tabs.TabPane;

interface ConnectedTabProps {
  dataProduct: any;
  data?: any;
};

interface TabsProps {
  dataProduct: any;
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

class ProductTabs extends React.Component<ConnectedTabProps, TabsProps> {
  render() {
    const dataProduct = this.props.dataProduct;
    const { brand, images, subProducts } = dataProduct;
    const subProduct = subProducts.map(el => el);
    const firstProduct = subProduct[0];
    console.log("SubProducts:", subProducts)
   return (
      <div>
        <Tabs
          animated
          defaultActiveKey="2"
          onChange={callback}
          onTabClick={handleTabClick}
        >
          <TabPane tab="Купить" key="1">
            <div style={{backgroundColor: "#fff" }}>
              <div  className="am-wingblank am-wingblank-lg">
                <div style={{display: "flex", flexDirection: "column", paddingTop: "10px"}}>
                  <div>{dataProduct.name} {brand.name}</div>
                  <div style={{color: "#b94a48", fontSize: "24px"}}>
                    {`Код товара: ${firstProduct.id}`}
                  </div>
                </div>
                <hr/>
                <Images images={images}/>
                <div style={{marginTop: "160px"}}>
                  <div style={{color: "green", fontSize: "24px"}}>Eсть в наличии</div>
                  <hr/>
                  <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <div style={{width: "50%"}}>
                      <div style={{fontSize: "40px", color: "#468847"}}>{firstProduct.price} грн</div>
                      <div style={{textDecoration: "line-through", fontSize: "24px", color: "#b94a48"}}>{firstProduct.oldPrice} грн</div>
                    </div>
                    <div style={{width: "50%"}}>
                      <Button
                        className="btn"
                        style={{background: "#51a351", textColor: "white"}}
                        // type="primary"
                        size="small"
                        icon={require('svg-sprite!./basket.svg')}
                      >
                        Купить
                      </Button>
                    </div>
                  </div>
                </div>
                <hr/>
                <div dangerouslySetInnerHTML={createMarkup(dataProduct.description)}>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                  slkdjf;lsjflsjljflsjdlfsjlksjldfkjadjal;kdfjal;dkjfaldjfal;djfla;djfaldj
                  slkdjf;lsjflsjljflsjdlfsjlksjldfkjadjal;kdfjal;dkjfaldjfal;djfla;djfaldj
                  slkdjf;lsjflsjljflsjdlfsjlksjldfkjadjal;kdfjal;dkjfaldjfal;djfla;djfaldj
                  slkdjf;lsjflsjljflsjdlfsjlksjldfkjadjal;kdfjal;dkjfaldjfal;djfla;djfaldj
                  slkdjf;lsjflsjljflsjdlfsjlksjldfkjadjal;kdfjal;dkjfaldjfal;djfla;djfaldj
                  slkdjf;lsjflsjljflsjdlfsjlksjldfkjadjal;kdfjal;dkjfaldjfal;djfla;djfaldj

            </div>
          </TabPane>
          <TabPane tab="Характеристика" key="2">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              характеристика
            </div>
          </TabPane>
          <TabPane tab="Размеры" key="3">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              таблица с размерами
            </div>
          </TabPane>
          <TabPane tab="选项卡三" key="4">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              选项卡三内容
            </div>
          </TabPane>
          <TabPane tab="选项卡三" key="5">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              选项卡三内容
            </div>
          </TabPane>
          <TabPane tab="选项卡三" key="6">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              选项卡三内容
            </div>
          </TabPane>
          <TabPane tab="选项卡三" key="7">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              选项卡三内容
            </div>
          </TabPane>
          <TabPane tab="选项卡三" key="8">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              选项卡三内容
            </div>
          </TabPane>
        </Tabs>
        <WhiteSpace />
      </div>
    )
  }
}

const mapStateToProps: any = (state) => ({
})

export default compose(
    connect<ConnectedTabProps, {}, TabsProps>(mapStateToProps),
)(ProductTabs);
