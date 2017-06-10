import { Progress } from "antd-mobile";
import * as React from "react";

class ProductsCounter extends React.Component<any, any> {
  public render() {
    const { scrolled, total } = this.props;
    return (
      <div>
        <div style={{
          bottom: 15,
          color: "gray",
          position: "fixed",
          right: 30,
        }}>
          {scrolled}/{total}
        </div>

        <Progress
          percent={Math.round(scrolled / total * 100)}
          position="normal"
          unfilled="hide"
          appearTransition
          style={{
            borderColor: scrolled === total ? "#468847" : "orange",
            bottom: 0,
            left: 0,
            position: "fixed",
            right: 0,
            width: "100%",
          }}
        />
      </div>

    );
  }
}

export default ProductsCounter;
