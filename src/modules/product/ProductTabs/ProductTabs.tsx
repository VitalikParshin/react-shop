import * as React from "react";

import {Button, Flex, Tabs, WhiteSpace} from "antd-mobile";
import {compose, gql, graphql} from "react-apollo";

import { Images } from "../index";
import { Loading } from "../../layout/index";
import { PRODUCT_QUERY } from "../../catalog/model";
import { connect } from "react-redux";

const TabPane = Tabs.TabPane;

interface ConnectedTabProps {
  data?: any;
};

interface TabsProps {
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
    return (
      <div>
        <Tabs
          animated
          defaultActiveKey="2"
          onChange={callback} onTabClick={handleTabClick}

        >
          <Tabs.TabPane tab="选项卡一" key="1">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              选项卡一内容
            </div>
          </Tabs.TabPane>
          <TabPane tab="选项卡二" key="2">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              选项卡二内容
            </div>
          </TabPane>
          <TabPane tab="选项卡三" key="3">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              选项卡三内容
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
