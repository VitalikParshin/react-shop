import * as React from "react";
import { Progress } from "antd-mobile";


class ProductsCounter extends React.Component<any,any> {
  render() {
    const { scrolled, total } = this.props;
    return (
      <div>
        <div style={{
          position: "fixed",
          right: 20,
          bottom: 15,
          color: "gray",
        }}>
          {scrolled}/{total}
        </div>

        <Progress
          percent={Math.round(scrolled/total*100)}
          position="normal"
          unfilled="hide"
          appearTransition
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            borderColor: "orange",
          }}
        />
      </div>

    )
  }
}

export default ProductsCounter;


