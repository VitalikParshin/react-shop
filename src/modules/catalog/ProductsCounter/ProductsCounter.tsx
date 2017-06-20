import { Progress } from "antd-mobile";
import * as React from "react";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

interface IProductsCounterProps {
  scrolled: number;
  total: number;
}

class ProductsCounter extends React.Component<IProductsCounterProps, any> {
  public render() {
    const { scrolled, total } = this.props;
    return (
      <div>
        <div className={styles.productsCounter}>
          {scrolled}/{total}
        </div>

        <Progress
          className={styles.progress}
          percent={Math.round(scrolled / total * 100)}
          position="normal"
          unfilled="hide"
          appearTransition
          style={{
            borderColor: scrolled === total ? "#468847" : "orange",
          }}
        />
      </div>

    );
  }
}

export default ProductsCounter;
