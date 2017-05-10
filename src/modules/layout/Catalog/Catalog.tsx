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
import { StickyContainer, Sticky } from "react-sticky";
import { Link } from "react-router-dom";
import { Loading, SubCatalog } from "../../layout/index";
import { ACTION_TOOTLE_CATALOG } from "../../layout/constants";

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
  onStickyStateChange = (isSticky) => {
    console.log(`Am I sticky?: ${ isSticky ? 'Yep!' : 'Nope!'}`);
  }

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
      style["height"] = "100%";
      style["padding"] = "65px 10px 10px 10px";
    }

    return (
      <div style={style}>
        {startCats.map((parent, i) => (
          <StickyContainer>
            <Sticky onStickyStateChange={this.onStickyStateChange}>
              <header>
                <h2 style={{textAlign:"center"}}>{parent.name}</h2>
              </header>
            </Sticky>
            <SubCatalog
              categories={childrenMap[parent.id]}
              isDrawer={isDrawer}
            />
          </StickyContainer>
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
