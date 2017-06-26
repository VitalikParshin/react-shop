import * as React from "react";
import {
  Flex,
  Button,
} from "antd-mobile";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

interface IConnectedProductBuyProps {
}

interface IProductBuyProps {
  price: number;
  oldPrice?: number;
}

class ProductBuy extends React.Component<IConnectedProductBuyProps & IProductBuyProps, any> {

  public render() {
    const { price, oldPrice } = this.props;

    return (
        <Flex className={styles.buy}>
          <div className={styles.buyPrice}>
            {
              !!oldPrice
              ? (
                <div>
                  <div className={styles.currentPrice}>{parseInt(price as any, 10)} грн</div>
                  <div className={styles.oldPrice}>{parseInt(oldPrice as any, 10)} грн</div>
                </div>
              )
              : <div className={styles.price}>{parseInt(price as any, 10)} грн</div>
            }
          </div>
          {/*<Button className={styles.buyButton}>*/}
          <Button>
            Купить
          </Button>
        </Flex>
    );
  }
}

export default ProductBuy;