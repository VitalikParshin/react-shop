import * as React from "react";
import { gql, compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Drawer, List, NavBar, Icon, WingBlank, Carousel, Flex, Card, WhiteSpace } from "antd-mobile";
import { Link } from "react-router-dom";
import { Products, Product } from "../index";
import { CATEGORY_QUERY } from "../model";

const options = {
  options: props => ({
    variables: {
      filter: {
        id: props.id
      }
    }
  })
};

class Category extends React.Component<any,any> {
  render() {
    const { loading, allCategories } = this.props.data;
    if (loading == true) {
      return <div>Loading...</div>
    }
    const category = allCategories[0]
    const { products } = category;
    return (
      <div>
        <h1>{category.name}</h1>
        <Product {...products[0]}/>
        <WhiteSpace/>
        <Product {...products[0]}/>
        <WhiteSpace/>
        <Product {...products[0]}/>
        <WhiteSpace/>
{/*        
        {products.map(product => (
          <Product {...product}/> 
        ))}
*/}      
      </div>
    )
  }
}

const mapStateToProps: any = (state) => ({})

export default compose(
    connect<any, {}, any>(mapStateToProps),
    graphql(CATEGORY_QUERY, options),
)(Category);
