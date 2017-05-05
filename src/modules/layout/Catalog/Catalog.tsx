import * as React from "react";
import { gql, compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import {
  Drawer,
  List,
  NavBar,
  Icon,
  WingBlank,
  Carousel,
  Flex,
  Card,
  Grid
} from "antd-mobile";
import {Link} from "react-router-dom";
import {Loading, SubCatalog} from "../../layout/index";
import {ACTION_TOOTLE_CATALOG} from "../../layout/constants";

export const CATALOG_QUERY = gql`
  query categories {
    categories {
      name
      id
      alias
      parent {
        id
      }
      image
    }
  }
`;


class Catalog extends React.Component<any,any> {
  render() {
    const { isDrawer, data } = this.props;
    const { loading, categories } = data;
    if (loading == true) {
      return <Loading/>
    }

    const startCats: any = [];
    const childrenMap: any = {};
    for (let cat of categories) {
      if (cat.parent) {
        const key = cat.parent.id;
        if (!(key in childrenMap)) {
          childrenMap[key] = [];
        }
        childrenMap[key].push(cat);
      } else {
        startCats.push(cat);
      }
    }

    let style = {}
    if (isDrawer === true) {
      style["width"] = 500;
      style["background"] = "aliceblue";
      style["padding"] = "65px 10px 10px 10px";
    }

    return (
      <div style={style}>
        {startCats.map(parent => (
          <div>
            <h2 style={{
              textAlign: "center",
            }}>{parent.name}</h2>
            <SubCatalog
              children={childrenMap[parent.id]}
              isDrawer={isDrawer}
            />
          </div>
        ))}
      </div>
    )

  }
}

const mapStateToProps: any = (state) => ({})

export default compose(
    connect<any, {}, any>(mapStateToProps),
    graphql(CATALOG_QUERY),
)(Catalog);
