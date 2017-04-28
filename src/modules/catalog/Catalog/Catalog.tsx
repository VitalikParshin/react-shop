import * as React from "react";
import { gql, compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Drawer, List, NavBar, Icon, WingBlank, Carousel, Flex, Card } from "antd-mobile";
import { Link } from "react-router-dom";

function chunk (arr, len=1) {
  var chunks: any = [],
      i = 0,
      n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}


export const CATALOG_QUERY = gql`
  query allCategories {
    allCategories {
      name
      id
      alias
      parent {
        id
      }
      image {
        url
      }
    }
  }
`;

class CatalogRow extends React.Component<any,any> {
  state = {
    initialHeight: 400,
  }
  render() {
    const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
    const { parent, children } = this.props;
    return (
      <WingBlank>
        <h2 className="sub-title">{parent.name}</h2>
        <Carousel
          autoplay={false} infinite selectedIndex={0}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {chunk(children, 2).map(cats => (
            <Flex>
              {cats.map(cat => (
                <Flex.Item>
                  <Link to={`/category/${cat.id}`}>
                    <img
                      src={cat.image ? cat.image.url : ""}
                      onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                        this.setState({
                          initialHeight: null,
                        });
                      }}
                    />
                    <div>{cat.name}</div>
                  </Link>
                </Flex.Item>
              ))}
            </Flex>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}


class Catalog extends React.Component<any,any> {
  render() {
    const { loading, allCategories } = this.props.data;
    if (loading == true) {
      return <div>Loading...</div>
    }

    const startCats: any = [];
    const childrenMap: any = {};
    for (let cat of allCategories) {
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

    return (
      <div>
        {startCats.map(parent => (
          <CatalogRow 
            parent={parent} 
            children={childrenMap[parent.id]} 
          /> 
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
