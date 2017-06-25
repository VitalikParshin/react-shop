import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Card,
  Carousel,
  Drawer,
  Flex,
  Grid,
  Icon,
  List,
  NavBar,
  WingBlank,
} from "antd-mobile";

import { IData } from "../../../model";

import { ACTION_TOOTLE_CATALOG } from "../../layout/constants";
import { HEIGHT } from "../../layout/Header/Header";
import { Loading, SubCatalog } from "../../layout/index";
import { ICategory } from "../../product/model";
import { CATALOG_QUERY } from "../model";

interface ICatalogData extends IData {
  categories: [ICategory];
}

interface IConnectedCatalogProps {
  dispatch: any;
  data: ICatalogData;
}

interface ICatalogProps {
  isDrawer: boolean;
}

class Catalog extends React.Component < IConnectedCatalogProps & ICatalogProps, any > {

  public render() {
    const { isDrawer, data} = this.props;
    const { loading, categories } = data;
    if (loading === true) {
      return <Loading />;
    }

    const startCats: any = [];
    const childrenMap: any = {};
    for (const cat of categories) {
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

    const style = {
      backgroundColor: "#f5f5f9",
      paddingTop: 10,
      textAlign: "center",
    };
    if (isDrawer === true) {
      // tslint:disable-next-line:no-string-literal
      style["width"] = window.innerWidth * 0.9;
      // tslint:disable-next-line:no-string-literal
      style["padding"] = 10;
    }

    return (
      <div style={style}>
        {startCats.map((parent, i) => (
          <div key={i}>
            <h2>{parent.name}</h2>
            <SubCatalog
              key={i}
              categories={childrenMap[parent.id]}
              isDrawer={isDrawer}
            />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps: any = (state) => ({});

export default compose(
    connect<IConnectedCatalogProps, {}, ICatalogProps>(mapStateToProps),
    graphql(CATALOG_QUERY),
)(Catalog);
