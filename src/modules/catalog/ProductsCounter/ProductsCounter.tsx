import * as React from "react";

class ProductsCounter extends React.Component<any,any> {
  render() {
    const { current, total } = this.props;
    return (
      <div style={{position: "fixed", right: 30, bottom: 15, color: "gray"}}>
        {current}/{total}
      </div>
    )
  }
}

export default ProductsCounter;


