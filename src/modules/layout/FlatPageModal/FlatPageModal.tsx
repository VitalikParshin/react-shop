// https://reacttraining.com/react-router/web/example/modal-gallery

import * as React from "react";
import Ripples from "react-ripples";

import {Flex, Icon } from "antd-mobile";
import {HEIGHT} from "../../layout/Header/Header";
import { utils, Modal } from "../../layout/index";
import {Product} from "../../product/index";
// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

function createMarkup(html) {
  return {__html: html};
}

class FlatPageModal extends React.Component<any, any> {
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
    const { match, history, location: {state: { pages }}} = this.props;
    const id = match.params.id;
    const page = pages.filter((el) => el.id === id );

    return (
      <Modal>
        <Flex
            className={styles.backPanel}
            justify="start"
            align="center"
        >
          <Ripples during={200}>
            <Icon
                className={styles.backIcon}
                type={require("!svg-sprite-loader!./back.svg")}
                size="md"
                style={{
                  height: HEIGHT,
                }}
                onClick={this.back}
            />
          </Ripples>
          <h3 style={{margin: 0, textAlign: "center", width: "80%"}}>
            {(page.map((el) => el.name))}
          </h3>
        </Flex>
        <div
          className={styles.flatpage}
          dangerouslySetInnerHTML={createMarkup(page.map((el) => el.content))}
          style={{
            marginTop: 100,
            padding: utils.isSafariBrowser() ? 20 : 0,
            textAlign: "left",
          }}
        />
      </Modal>
    );
  }
}

export default FlatPageModal;
