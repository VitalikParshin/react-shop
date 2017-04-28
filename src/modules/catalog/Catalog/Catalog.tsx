import * as React from "react";
import { gql, compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Drawer, List, NavBar, Icon } from "antd-mobile";

export const CATALOG_QUERY = gql`
  query allCategories {
    allCategories {
      name
      id
      alias
      parent {
        id
      }
    }
  }
`;

class Catalog extends React.Component<any,any> {
  render() {
    const { loading, allCategories } = this.props.data;
    if (loading == true) {
      return <div>Loading...</div>
    }
    return (
      <List>
        {allCategories.map((cat, index) => {
          return (
            <List.Item 
              key={cat}
              thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            >
              {cat.name}
            </List.Item>
          );
        })}
      </List>
    );

  }
}

const mapStateToProps: any = (state) => ({})

export default compose(
    connect<any, {}, any>(mapStateToProps),
    graphql(CATALOG_QUERY),
)(Catalog);
