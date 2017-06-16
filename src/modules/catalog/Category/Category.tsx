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
import { ACTION_TOOTLE_CATALOG } from "../../layout/constants";
import { HEIGHT } from "../../layout/Header/Header";
import {Loading, utils} from "../../layout/index";
import {ILayout} from "../../layout/model";
import { Product, Products } from "../index";
import {CATEGORY_QUERY} from "../model";
// import { CATEGORY_QUERY } from "../model";
interface IConnectedCategoryProps {
  dispatch: any;
  layout: ILayout;
  data: any;
}

interface ICategoryProps {
  id: string;
}

const options = {
  options: (props) => ({
    variables: {
      id: props.id,
    },
  }),
};

class Category extends React.Component<IConnectedCategoryProps & ICategoryProps, any> {

  public render() {
    const { id, dispatch, layout, data } = this.props;
    const { loading } = data;
    if (loading === true) {
      return <Loading />;
    }
    return (
      <div style={{margin: "20px 10px"}}>
        <div>{id}</div>
        <Products categoryId={id}/>
      </div>
    );
  }
}

const mapStateToProps: any = (state) => ({
  layout: state.layout,
});

export default compose(
    connect<IConnectedCategoryProps, {}, ICategoryProps>(mapStateToProps),
    graphql(CATEGORY_QUERY, options),
)(Category);
