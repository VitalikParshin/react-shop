// https://reacttraining.com/react-router/web/example/modal-gallery

import * as React from "react";
import { Product } from "../index";
import {Modal, Flex, Icon} from "antd-mobile";
import {HEIGHT} from "../../layout/Header/Header";
import Ripples from "react-ripples";


class ProductModal extends React.Component<any,any> {
  state = {
    showModal: true
  }

  back = (e) => {
    e.stopPropagation();
    this.props.history.goBack();
    this.setState({
      showModal: false,
    })
  }

  render() {
    const { match, history } = this.props;
    return (
      <Modal
        transparent={false}
        visible={this.state.showModal}
        animationType="fade"
        style={{textAlign: "left"}}
      >
        <Flex
            justify="start"
            align="center"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgb(0, 136, 204)",
              width: "100%",
              color: "white",
              zIndex: 1000,
            }}
        >
          <Ripples during={200}>
            <Icon
              type={require("!svg-sprite!./back.svg")}
              size="md"
              style={{
                fill: "white",
                height: HEIGHT,
                padding: "0 20px",
              }}
              onClick={this.back}
            />
          </Ripples>
          <h3 style={{margin: 0, textAlign:"center", width:"80%"}}>
            Товар #{match.params.id}
          </h3>
        </Flex>

        <div style={{marginTop: HEIGHT}}>
          <Product id={match.params.id}/>
        </div>
      </Modal>
    )
  }
}

export default ProductModal;
