import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";

import {
  Button,
  Card,
  Carousel,
  Drawer,
  Flex,
  Icon,
  List,
  NavBar,
  WhiteSpace,
  WingBlank,
} from "antd-mobile";

import { Link } from "react-router-dom";
import Sidebar from "react-sidebar";
import { ACTION_TOOTLE_CATALOG, ACTION_TOOTLE_FILTERS } from "../../layout/constants";
import { HEIGHT } from "../../layout/Header/Header";
import { utils } from "../../layout/index";
import { Filters, FiltersTrigger, Product, Products } from "../index";
import { CATEGORY_QUERY } from "../model";

const options = {
  options: (props) => ({
    skip: true,
    variables: {
      id: props.id,
    },
  }),
};

class Category extends React.Component<any, any> {

  public onSetSidebarOpen = () => {
    const { dispatch } = this.props;
    dispatch({type: ACTION_TOOTLE_FILTERS});
  }

  public render() {
    const { id, dispatch, layout } = this.props;
    return (
      <div style={{margin: "20px 10px"}}>
        <Products categoryId={id}/>
      </div>
    );
  }
}

const mapStateToProps: any = (state) => ({
  layout: state.layout,
});

export default compose(
    connect<any, {}, any>(mapStateToProps),
    graphql(CATEGORY_QUERY, options),
)(Category);
