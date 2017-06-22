import { Card, Flex } from "antd-mobile";
import Touchable from "rc-touchable";
import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import Ripples from "react-ripples";
import { Link } from "react-router-dom";
import { push } from "react-router-redux";
import styled from "../../../styled-components";
import {ACTION_ADD_VIEWED_CATEGORY} from "../../catalog/constants";
import { ICategory } from "../../product/model";
import { ACTION_DISABLE_CATALOG, ACTION_RESET } from "../constants";
import { ILayout } from "../model";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

interface IConnectedSubCatalogProps {
  catalog: any;
  layout: ILayout;
  dispatch: any;
  router: any;
}

interface ISubCatalogProps {
  categories: [ICategory];
  isDrawer: boolean;
}

function chunk(arr, len = 1) {
  const chunks: any = [];
  let i = 0;
  const n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}

const CardStyled: any = styled(Card)`
  border: 1px solid ${(props) => (props as any).isViewed ? "orange" : "lightgrey"};
`;

class SubCatalog extends React.Component<IConnectedSubCatalogProps & ISubCatalogProps, any> {
  public state = {
    initialHeight: 400,
  };

  public onClick = (event, cat) => {
    const {dispatch} = this.props;
    dispatch({type: ACTION_ADD_VIEWED_CATEGORY, categoryId: cat.id});
    Promise.resolve(
      dispatch({type: ACTION_DISABLE_CATALOG}),
    )
    .then((response) => {
      if (!this.isCurrentCategory(cat.id)) {
        dispatch(push(`/category/${cat.id}`));
      }
    });
  }

  public isViewed(id) {
    const {catalog, categories} = this.props;
    return catalog.viewedCategoryIds.indexOf(id) !== -1;
  }

  public isCurrentCategory = (id) => {
    const { router: {location: {pathname }}} = this.props;
    return pathname.search(`/category/${id}`) !== -1;
  }

  public render() {
    const { dispatch, categories, isDrawer } = this.props;

    return (
      <div>
        {chunk(categories, 2).map((cats) => (
          <Flex justify="center">
            {cats.map((cat, index) => (
              <Flex.Item
                  className={styles.flexItem}
                  key={`cat${index}`}
              >
                <CardStyled
                  isViewed={this.isViewed(cat.id)}
                >

                  <Ripples>

                    <div
                        className={styles.card}
                        style={{
                          opacity: this.isCurrentCategory(cat.id) ? 0.3 : 1,
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
                      <div className={styles.name}>
                        {cat.name}
                      </div>
                    </div>
                  </Ripples>
                </CardStyled>
              </Flex.Item>
            ))}
          </Flex>
        ))}
      </div>
    );
  }
}

const mapStateToProps: any = (state) => ({
  catalog: state.catalog,
  layout: state.layout,
  router: state.router,
});

export default compose(
    connect<IConnectedSubCatalogProps, {}, ISubCatalogProps>(mapStateToProps),
)(SubCatalog);
