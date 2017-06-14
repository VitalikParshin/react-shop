import {Card, Flex} from "antd-mobile";
import Touchable from "rc-touchable";
import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import Ripples from "react-ripples";
import {Link} from "react-router-dom";
import { push } from "react-router-redux";
import {ACTION_DISABLE_CATALOG, ACTION_RESET} from "../constants";
import {SidebarCatalog} from "../index";

function chunk(arr, len = 1) {
  const chunks: any = [];
  let i = 0;
  const n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}

class SubCatalog extends React.Component<any, any> {
  public state = {
    initialHeight: 400,
  };

  public onClick = (event, cat) => {
    const {dispatch} = this.props;
    Promise.resolve(
      dispatch({type: ACTION_DISABLE_CATALOG}),
    )
    .then((response) => {
      dispatch(push(`/category/${cat.id}`));
    });
  }

  public render() {
    const { dispatch, categories, isDrawer } = this.props;

    return (
      <div>
        {chunk(categories, 2).map((cats) => (
          <Flex justify="center">
            {cats.map((cat, index) => (
              <Flex.Item
                key={`cat${index}`}
                style={{textAlign: "center", margin: 5}
              }>
                <Card style={{padding: 0}}>
                  <Ripples>
                    <div
                      style={{
                        height: 190,
                        paddingBottom: 10,
                        paddingTop: 30,
                      }}
                      onClick={(e) => this.onClick(e, cat)}
                    >
                      <img
                        src={cat.image || ""}
                        onLoad={() => {
                          // fire window resize event to change height
                          window.dispatchEvent(new Event("resize"));
                          this.setState({
                            initialHeight: null,
                          });
                        }}
                      />
                      <div style={{maxWidth: "80%", margin: "auto"}}>
                        {cat.name}
                      </div>
                    </div>
                  </Ripples>
                </Card>
              </Flex.Item>
            ))}
          </Flex>
        ))}
      </div>
    );
  }
}

const mapStateToProps: any = (state) => ({
  layout: state.layout,
});

export default compose(
    connect<any, {}, any>(mapStateToProps),
)(SubCatalog);
