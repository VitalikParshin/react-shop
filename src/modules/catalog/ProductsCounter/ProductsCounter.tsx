import * as React from "react";
import { Progress } from "antd-mobile";


class ProductsCounter extends React.Component<any,any> {
  render() {
    const { current, total } = this.props;
    return (
      <div>
        <div style={{
          position: "fixed",
          right: 20,
          bottom: 10,
          color: "rgb(0, 136, 204)",
        }}>
          {current}/{total}
        </div>

        <Progress
          percent={Math.round(current/total*100)}
          position="normal"
          unfilled="hide"
          appearTransition
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
          }}
        />
      </div>

    )
  }
}

export default ProductsCounter;


