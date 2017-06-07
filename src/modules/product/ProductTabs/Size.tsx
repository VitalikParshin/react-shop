import * as React from "react";
import { connect } from "react-redux";
import { List, Icon } from "antd-mobile";

const Item = List.Item;

class Size extends React.Component<any, any>{

  render(){
    const {subProducts} = this.props.dataProduct;
    return (
      <List>
          {subProducts.map(el => (
              <Item
                  extra={
                      el.attributes.length != 0
                      ? el.attributes.slice(0, 3).map(e => e.values.map(i => i.value) ).join("x") + " " + el.attributes.slice(5, 6).map(e => e.values.map(i => i.name))
                      : el.article
                    }
              >
                Размер (Ш x В x Г) :
              </Item>
          ))}
        </List>
    )
  }
}

export default connect()(Size);
