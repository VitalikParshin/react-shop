import * as React from "react";

import { compose, gql, graphql } from "react-apollo";

import {
  List,
  WhiteSpace,
  WingBlank,
  Button,
  Modal,
  Icon
} from "antd-mobile";
import {Loading} from "../index";

const FLATPAGES_QUERY = gql `
  query flatpages{
    flatPages{
      id
      name
      url
      content
      templateName
      metaTitle
      metaDescription
      metaKeywords
      dateUpdated
      isActive
      image
    }
  }
`

function createMarkup(html) {
  return {__html: html};
}

class FlatPages extends React.Component<any, any> {

  state = {
    showModal: false,
    page: {
      name: "",
      content: "",
    }
  }

  showModal = (e, page) => {
    e.preventDefault();
    this.setState({
      page: page,
      showModal: true,
    });
  }

  closeModal = () => {
    this.setState({
      content: "",
      showModal: false,
    });
  }

  getIcon = (id) => {
    const _id = parseInt(id)
    switch(_id) {
      //info
      case 4: {
        return require("!svg-sprite!./about.svg");
      }
      //contacts
      case 5: {
        return require("!svg-sprite!./contacts.svg");
      }
      //exchange and return
      case 8: {
        return require("!svg-sprite!./exchange.svg");
      }
      //make order
      case 7: {
        return require("!svg-sprite!./order.svg");
      }
      //buyers
      case 10: {
        return require("!svg-sprite!./buyers.svg");
      }
      //discount card
      case 6: {
        return require("!svg-sprite!./discount.svg");
      }
      //schedule of work
      case 14: {
        return require("!svg-sprite!./schedule.svg");
      }
      //shipping and payment
      case 2: {
        return require("!svg-sprite!./shipping.svg");
      }
      // rozygrish
      case 15: {
        return require("!svg-sprite!./roulette.svg");
      }
      //suppliers
      case 11: {
        return require("!svg-sprite!./info.svg");
      }
      //guarantee
      case 3: {
        return require("!svg-sprite!./guarantee.svg");
      }
      default: {
        return require("!svg-sprite!./transport.svg");
      }
    }
  }

  render() {
    const { data }  = this.props;
    const { loading, flatPages } = data;

    if (loading === true) {
      return <Loading/>;
    }

    return (
      <div>
        <List>
          {flatPages.map(page => (
            <List.Item
              wrap
              arrow="horizontal"
              thumb={<Icon type={this.getIcon(page.id)} style={{fill: "black"}} size="md"/>}
              onClick={(e) => this.showModal(e, page) }
            >
              {page.name}
            </List.Item>
          ))}
        </List>

        <Modal
          closable
          maskClosable
          transparent
          title={this.state.page.name}
          visible={this.state.showModal}
          animationType="fade"
          onClose={this.closeModal}
        >
          <div
            dangerouslySetInnerHTML={createMarkup(this.state.page.content)}
            style={{ textAlign: "left" }}
          />
        </Modal>
      </div>
    )
  }
}

export default graphql(FLATPAGES_QUERY)(FlatPages);
