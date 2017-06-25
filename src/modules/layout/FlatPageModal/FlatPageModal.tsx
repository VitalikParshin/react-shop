// https://reacttraining.com/react-router/web/example/modal-gallery

import * as React from "react";
import Ripples from "react-ripples";

import {Flex, Icon, Modal} from "antd-mobile";
import {HEIGHT} from "../../layout/Header/Header";
import { utils } from "../../layout/index";
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
              }}
          >
            <Ripples during={200}>
              <Icon
                  className={styles.backIcon}
                  type={require("!svg-sprite!./back.svg")}
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
          <div className={styles.flatpage}
            dangerouslySetInnerHTML={createMarkup(page.map((el) => el.content))}
            style={{
              marginTop: 100,
              padding: utils.isSafariBrowser() ? 20 : 0,
              textAlign: "left",
            }}
          />
      </div>
    );
  }
}

export default FlatPageModal;
