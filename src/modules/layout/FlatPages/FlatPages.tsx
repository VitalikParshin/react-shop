import * as React from "react";
import { connect } from "react-redux";

import { compose, gql, graphql } from "react-apollo";
import {ILayout} from "../model";
import Ripples from "react-ripples";
import { utils } from "../../layout/index";

import {
  List,
  WhiteSpace,
  WingBlank,
  Button,
  Modal,
Icon,
Flex
} from "antd-mobile";
import {Loading} from "../index";
import {HEIGHT} from "../Header/Header";

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
      id: "",
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
    if (!data) {
      return <div></div>
    }

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
          transparent={false}
          visible={this.state.showModal}
          animationType="fade"
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
                onClick={this.closeModal}
              />
            </Ripples>
            <h3 style={{margin: 0, textAlign:"center", width:"80%"}}>
              {this.state.page.name}
            </h3>
          </Flex>
          <div
            dangerouslySetInnerHTML={createMarkup(this.state.page.content)}
            style={{
              padding: utils.isSafariBrowser() ? 20 : 0,
              textAlign: "left",
              marginTop: 100,
            }}
          />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps: any = (state) => ({
  layout: state.layout,
  router: state.router,
})

export default compose(
  connect<any, {}, any>(mapStateToProps),
  graphql(FLATPAGES_QUERY, {
    options: ({ layout, router }) => ({
      skip: !(
        router.location.pathname == "/"
        || layout.openMenu
      ),
    }),
  })
)(FlatPages);
