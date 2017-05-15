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
      case 2: {
        return require("!svg-sprite!./menu.svg");
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
              {page.id} {page.name}
            </List.Item>
          ))}
        </List>

        <Modal
          closable
          maskClosable
          transparent={false}
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
