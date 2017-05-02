import * as React from "react";
import {
  Card,
  Button,
  Flex,
  List,
  Switch,
  WingBlank,
  createTooltip,
  Range,
} from "antd-mobile";
import {Images} from "../../product/index";
import { Link } from "react-router-dom";
import Sidebar from "react-sidebar";
import { compose } from "react-apollo";
import { connect } from "react-redux";


const RangeWithTooltip = createTooltip(Range);


class Filter extends React.Component<any,any> {
  state = {
    active: true
  }
  handleChange = () => {
    this.setState({active: !this.state.active});
  }
  render() {
    return (
      <Switch
        checked={this.state.active}
        onChange={this.handleChange}
      />
    )
  }
}


class Filters extends React.Component<any, any> {
  render() {
    const log = (name) => {
      return (value) => {
        console.log(`${name}: ${value}`);
      };
    };

    return (

      <div style={{zIndex: 2000, background:"white", width: 500, height: "100%"}}>
        <List
          renderHeader={() => '表单开关项'}
        >
          <List.Item
            extra={<Filter/>}
          >Со скидкой</List.Item>

          <WingBlank size="lg">
            <p className="title">Цена</p>
            <RangeWithTooltip
              min={0}
              max={1000}
              defaultValue={[0,1000]}
              // onChange={log('change')}
              onAfterChange={log('afterChange')}
            />
          </WingBlank>

        </List>
      </div>
    );
  }
}

export default Filters;
