import * as React from "react";

import {Button, Flex, WhiteSpace} from "antd-mobile";
import {Catalog, FlatPages} from "../../modules/layout/index";

const HomePage = () => {
  return (
    <div>
      <Catalog />
      <WhiteSpace size="lg" />
      <FlatPages />
    </div>
  );
};

export default HomePage;
