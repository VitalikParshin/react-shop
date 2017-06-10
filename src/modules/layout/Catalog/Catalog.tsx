import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {  Sticky, StickyContainer } from "react-sticky";

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

import { ACTION_TOOTLE_CATALOG } from "../../layout/constants";
import { HEIGHT } from "../../layout/Header/Header";
import { Loading, SubCatalog } from "../../layout/index";

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

class Catalog extends React.Component<any, any> {

  public render() {
    const { isDrawer, data } = this.props;
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
          <div>
            <h2>{parent.name}</h2>
            <SubCatalog
              categories={childrenMap[parent.id]}
              isDrawer={isDrawer}
            />
          </div>
        ))}
      </div>
    );

    // onStickyStateChange = (isSticky) => {
    //   console.log(`Am I sticky?: ${ isSticky ? 'Yep!' : 'Nope!'}`);
    // }

    // return (
    //   <div style={style}>
    //     {startCats.map((parent, i) => (
    //       <StickyContainer>
    //         <Sticky
    //           topOffset={-HEIGHT * 1.5}
    //           stickyStyle={{top: HEIGHT}}
    //           // onStickyStateChange={this.onStickyStateChange}
    //         >
    //           <header>
    //             <h2 style={{ textAlign:"center", background: "#f5f5f9", zIndex: 10000}}>
    //               {parent.name}
    //             </h2>
    //           </header>
    //         </Sticky>
    //         <SubCatalog
    //           categories={childrenMap[parent.id]}
    //           isDrawer={isDrawer}
    //         />
    //       </StickyContainer>
    //     ))}
    //   </div>
    // )

  }
}

const mapStateToProps: any = (state) => ({});

export default compose(
    connect<any, {}, any>(mapStateToProps),
    graphql(CATALOG_QUERY),
)(Catalog);
