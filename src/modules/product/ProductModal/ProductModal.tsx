// https://reacttraining.com/react-router/web/example/modal-gallery

import * as React from "react";
import Ripples from "react-ripples";

import {Flex, Icon, Modal} from "antd-mobile";
import {HEIGHT} from "../../layout/Header/Header";
import { Product } from "../index";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

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
            className={styles.flex}
            justify="start"
            align="center"
        >
          <Ripples during={200}>
            <Icon
                className={styles.icon}
                type={require("!svg-sprite!./back.svg")}
                size="md"
                style={{
                  height: HEIGHT,
                }}
                onClick={this.back}
            />
          </Ripples>
          <h3 className={styles.productName}>
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
