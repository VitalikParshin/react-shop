import * as React from "react";
import { connect } from "react-redux";

import { compose, gql, graphql } from "react-apollo";
import Ripples from "react-ripples";
import {FLATPAGES_QUERY, IFlatPage, ILayout} from "../model";

import {
  Button,
  Flex,
  Icon,
  List,
  Modal,
WhiteSpace,
WingBlank,
} from "antd-mobile";
import { Link } from "react-router-dom";
import {IData} from "../../../model";
import {HEIGHT} from "../Header/Header";
import {FlatPageModal, Loading} from "../index";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

interface IFlatPagesData extends IData {
  flatPages: IFlatPage;
}

interface IConnectedFlatPagesProps {
  layout: ILayout;
  router: any;
  dispatch: any;
  data: IFlatPagesData;
}

function createMarkup(html) {
  return {__html: html};
}

// class FlatPages extends React.Component<IConnectedFlatPagesProps & any, any> {
class FlatPages extends React.Component<any, any> {

  public state = {
    page: {
      content: "",
      id: "",
      name: "",
    },
    showModal: false,
  };

  public showModal = (e, page) => {
    e.preventDefault();
    this.setState({
      page,
      showModal: true,
    });
  }

  public getIcon = (id) => {
    // tslint:disable-next-line:variable-name
    const _id = parseInt(id, 10);
    switch (_id) {
      // info
      case 4: {
        return require("!svg-sprite-loader!./about.svg");
      }
      // contacts
      case 5: {
        return require("!svg-sprite-loader!./contacts.svg");
      }
      // exchange and return
      case 8: {
        return require("!svg-sprite-loader!./exchange.svg");
      }
      // make order
      case 7: {
        return require("!svg-sprite-loader!./order.svg");
      }
      // buyers
      case 10: {
        return require("!svg-sprite-loader!./buyers.svg");
      }
      // discount card
      case 6: {
        return require("!svg-sprite-loader!./discount.svg");
      }
      // schedule of work
      case 14: {
        return require("!svg-sprite-loader!./schedule.svg");
      }
      // shipping and payment
      case 2: {
        return require("!svg-sprite-loader!./shipping.svg");
      }
      // rozygrish
      case 15: {
        return require("!svg-sprite-loader!./roulette.svg");
      }
      // suppliers
      case 11: {
        return require("!svg-sprite-loader!./info.svg");
      }
      // guarantee
      case 3: {
        return require("!svg-sprite-loader!./guarantee.svg");
      }
      default: {
        return require("!svg-sprite-loader!./transport.svg");
      }
    }
  }

  public render() {
    const { data }  = this.props;
    if (!data) {
      return <div></div>;
    }

    const { loading, flatPages } = data;
    if (loading === true) {
      return <Loading/>;
    }

    return (
      <div>
        <List>
          {flatPages.map((page) => (
            <Link
                to={{
                  pathname: `/img/${page.id}`,
                  // this is the trick!
                  state: { modal: true, pages: flatPages },
                }}
              >
              <List.Item
                wrap
                arrow="horizontal"
                thumb={<Icon className={styles.icon} type={this.getIcon(page.id)} size="md"/>}
                onClick={(e) => this.showModal(e, page) }
              >
                {page.name}
              </List.Item>
            </Link>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps: any = (state) => ({
  layout: state.layout,
  router: state.router,
});

export default compose(
  connect<IConnectedFlatPagesProps, {}, any>(mapStateToProps),
  graphql(FLATPAGES_QUERY, {
    options: ({ layout, router }) => ({
      skip: !(
        router.location.pathname === "/"
        || layout.openMenu
      ),
    }),
  } as any),
)(FlatPages);
