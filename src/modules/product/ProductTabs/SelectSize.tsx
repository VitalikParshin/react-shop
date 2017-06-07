import * as React from "react";
import { connect } from "react-redux";

import {ACTION_SELECT_SUBPRODUCT} from "../constants";
import {
  Icon,
  Checkbox,
  List,
  Radio,
  Flex,
  WhiteSpace,
  WingBlank
} from "antd-mobile";


const Item = List.Item;

interface ConnectedSizeProps {
  dispatch: any;
  product: any;
}

interface SizeProps {
  dataProduct: any
}

class SelectSize extends React.Component <ConnectedSizeProps & SizeProps, any > {

  onChangePrice = (elId) => {
    this.props.dispatch(
      {
        type: ACTION_SELECT_SUBPRODUCT,
        subProductId: elId,
        colorId: this.props.product.colorId
      }
    )
  }

  render() {

    const {subProducts} = this.props.dataProduct;

    return (
        <List renderHeader={ () => {
          return (
            <div style={{display: "flex", alignItems: "flex-end"}}>
              <Icon type={require('svg-sprite!./product-sizes.svg')}  style={{color: "#1296db", }}/>
              <div style={{color: "#1296db"}}>Выберите Размер (Ш x В x Г) :</div>
            </div>
          )
        }}>
          {subProducts.map(el => (
              <Item
                  onClick={() => this.onChangePrice(el.id)}
                  thumb={el.id === this.props.product.subProductId ?
                    <Icon
                      type={require('svg-sprite!./check-circle.svg')}
                      style={{fill: "#62f104"}}/>
                    :
                    <Icon
                      type={require('svg-sprite!./circle.svg')}/>}
              >
                {
                  el.attributes.length != 0
                  ? el.attributes.slice(0, 3).map(e => e.values.map(i => i.value) ).join("x") + " " + el.attributes.slice(5, 6).map(e => e.values.map(i => i.name))
                  : el.article
                }
              </Item>
          ))}
        </List>
    );
  }
}


const mapStateToProps: any = (state) => ({
  product: state.product
})

export default connect<ConnectedSizeProps, {}, SizeProps>(mapStateToProps)(SelectSize);

