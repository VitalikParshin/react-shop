import * as React from "react";

import {Button, Flex, WhiteSpace} from "antd-mobile";
import {Catalog, FlatPages} from "../../modules/layout/index";
import WingBlank from "antd-mobile/lib/wing-blank/index.web";

const HomePage = () => {
  return (
    <div>
      <WingBlank size="sm">
        <Catalog isDrawer={false} />
      </WingBlank>
      <WhiteSpace size="lg" />
      <FlatPages />
    </div>
  );
};

export default HomePage;
