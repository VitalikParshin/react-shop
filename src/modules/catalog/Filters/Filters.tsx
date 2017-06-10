import * as React from "react";

import {
  Button,
  Card,
  createTooltip,
  Flex,
  List,
  Range,
  Switch,
  WingBlank,
} from "antd-mobile";

import { compose } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Images } from "../../product/index";

const RangeWithTooltip = createTooltip(Range);

class Filter extends React.Component<any, any> {
  public state = {
    active: true,
  };

  public handleChange = () => {
    this.setState({active: !this.state.active});
  }

  public render() {
    return (
      <Switch
        checked={this.state.active}
        onChange={this.handleChange}
      />
    );
  }
}

// tslint:disable-next-line:max-classes-per-file
class Filters extends React.Component<any, any> {
  public render() {
    const log = (name) => {
      return (value) => {
        // tslint:disable-next-line:no-console
        console.log(`${name}: ${value}`);
      };
    };

    return (

      <div style={{
        background: "white",
        height: "100%",
        width: 500,
      }}>
        <List
          renderHeader={() => "表单开关项"}
        >
          <List.Item
            extra={<Filter/>}
          >Со скидкой</List.Item>

          <WingBlank size="lg">
            <p className="title">Цена</p>
            <RangeWithTooltip
              min={0}
              max={1000}
              defaultValue={[0, 1000]}
              // onChange={log("change")}
              onAfterChange={log("afterChange")}
            />
          </WingBlank>

        </List>
      </div>
    );
  }
}

export default Filters;
