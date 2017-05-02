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
  WhiteSpace,
  Button
} from "antd-mobile";
import { Link } from "react-router-dom";
import {Products, Product, Filters, FilterTrigger} from "../index";
import {CATEGORY_QUERY} from "../model";
import { ACTION_TOOTLE_FILTERS } from "../../layout/constants";
import Sidebar from "react-sidebar";

const options = {
  options: props => ({
    skip: true,
    variables: {
      id: props.id
    }
  })
};


class Category extends React.Component<any,any> {

  // onCLick = () => {
  //   const { dispatch } = this.props;
  //   dispatch({type: ACTION_TOOTLE_FILTERS})
  // }
        // <Filters/>
        // <Button onClick={this.onCLick}>ФИЛЬТРЫ</Button>

  onSetSidebarOpen = () => {
    const { dispatch } = this.props;
    dispatch({type: ACTION_TOOTLE_FILTERS})
  }

  render() {
    const { id, dispatch, layout } = this.props;

    return (
      <Sidebar
        pullRight
        touch
        sidebar={<Filters/>}
        open={layout.openFilters}
        onSetOpen={this.onSetSidebarOpen as any}
      >
        <div style={{paddingTop: 80}}>
          <Flex>
            <Flex.Item><Button>КАТАЛОГ</Button></Flex.Item>
            <Flex.Item><FilterTrigger /></Flex.Item>
          </Flex>
          <Products categoryId={id}/>
        </div>
      </Sidebar>
    )
  }
}

        // <Products categoryId={category.id}/>

const mapStateToProps: any = (state) => ({
  layout: state.layout,
})

export default compose(
    connect<any, {}, any>(mapStateToProps),
    graphql(CATEGORY_QUERY, options),
)(Category);
