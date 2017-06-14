import * as React from "react";
import { connect } from "react-redux";

import {
  Checkbox,
  Flex,
  Icon,
  List,
  Radio,
  WhiteSpace,
  WingBlank,
} from "antd-mobile";
import { ACTION_SELECT_SUBPRODUCT } from "../constants";
import {ICurrentDataProduct, ISubProduct} from "../model";

const Item = List.Item;

interface IConnectedSizeProps {
  dispatch: any;
  product: ICurrentDataProduct;
}

interface ISizeProps {
  subProducts: [ISubProduct];
}

class SelectSize extends React.Component <IConnectedSizeProps & ISizeProps, any > {

  public onChangePrice = (elId) => {
    this.props.dispatch(
      {
        colorId: this.props.product.colorId,
        subProductId: elId,
        type: ACTION_SELECT_SUBPRODUCT,
      },
    );
  }

  public render() {

    const { subProducts } = this.props;

    return (
        <List renderHeader={ () => {
          return (
            <div style={{display: "flex", alignItems: "flex-end"}}>
              <Icon type={require("svg-sprite!./product-sizes.svg")}  style={{color: "#1296db"}}/>
              <div style={{color: "#1296db"}}>Выберите Размер (Ш x В x Г) :</div>
            </div>
          );
        }}>
          {subProducts.map((el) => (
              <Item
                  onClick={() => this.onChangePrice(el.id)}
                  thumb={el.id === this.props.product.subProductId ?
                    <Icon
                      type={require("svg-sprite!./check-circle.svg")}
                      style={{fill: "#62f104"}}/>
                    :
                    <Icon
                      type={require("svg-sprite!./circle.svg")}/>}
              >
                {
                  el.attributes.length !== 0
                  ? el.attributes.slice(0, 3).map((e) => e.values.map((i) => i.value) ).join("x") +
                    " " + el.attributes.slice(5, 6).map((e) => e.values.map((i) => i.name))
                  : el.article
                }
              </Item>
          ))}
        </List>
    );
  }
}

const mapStateToProps: any = (state) => ({
  product: state.product,
});

export default connect<IConnectedSizeProps, {}, ISizeProps>(mapStateToProps)(SelectSize);
