// https://reacttraining.com/react-router/web/example/modal-gallery

import * as React from "react";
import Ripples from "react-ripples";

import {Flex, Icon, Modal} from "antd-mobile";
import {HEIGHT} from "../../layout/Header/Header";
import { Product } from "../index";

class ProductModal extends React.Component<any, any> {
  public state = {
    showModal: true,
  };

  public back = (e) => {
    e.stopPropagation();
    this.props.history.goBack();
    this.setState({
      showModal: false,
    });
  }

  public render() {
    const { match, history } = this.props;
    return (
      <div className="modal">
        <Flex
            justify="start"
            align="center"
            style={{
              backgroundColor: "rgb(0, 136, 204)",
              color: "white",
              left: 0,
              position: "fixed",
              right: 0,
              top: 0,
              width: "100%",
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
          <h3 style={{margin: 0, textAlign: "center", width: "80%"}}>
            Товар #{match.params.id}
          </h3>
        </Flex>

        <div style={{marginTop: HEIGHT}}>
          <Product id={match.params.id}/>
        </div>
      </div>
    );
  }
}

export default ProductModal;
