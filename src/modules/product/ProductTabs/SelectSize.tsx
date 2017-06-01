import * as React from "react";
import { connect } from "react-redux";

import {ACTION_SELECT_SUBPRODUCT} from "../constants";
import {Icon, Checkbox, List, Radio} from "antd-mobile";


interface ConnectedSizeProps {

}

interface SizeProps {
  dataSubProducts: any
}

const CheckboxItem = Checkbox.CheckboxItem;

class SelectSize extends React.Component <any, any > {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  onChangePrice = (val) => {
    this.props.dispatch({type: ACTION_SELECT_SUBPRODUCT, subProductId: val})
    console.log(val);
  }

  render() {
    const subProducts = this.props.dataSubProducts;
    const header = () => {
      return (
        <div className="size" style={{display: "flex", alignItems: "flex-end"}}>
          <Icon type={require('svg-sprite!./product-sizes.svg')}  style={{color: "#1296db", }}/>
          <div style={{color: "#1296db"}}>Выберите Размер(Ш x В x Г) :</div>
        </div>
      )
    }

    return (
      <div>
        <List renderHeader={ () => {
          return (
            <div className="size" style={{display: "flex", alignItems: "flex-end"}}>
              <Icon type={require('svg-sprite!./product-sizes.svg')}  style={{color: "#1296db", }}/>
              <div style={{color: "#1296db"}}>Выберите Размер (Ш x В x Г) :</div>
            </div>
          )
        }}>
          {subProducts.map(el => (
            <CheckboxItem key={el.id} onChange={() => this.onChangePrice(el.id)}>
              {
                el.attributes.length != 0 ?
                el.attributes.slice(0, 3).map(e => e.values.map(i => i.value) ).join("x") + " " + el.attributes.slice(5, 6).map(e => e.values.map(i => i.name)) :
                el.article
              }
            </CheckboxItem>
          ))}
        </List>
      </div>
    );
  }
}


const mapStateToProps: any = (state) => ({
  product: state.product
})

export default connect<ConnectedSizeProps, {}, SizeProps>(mapStateToProps)(SelectSize);

