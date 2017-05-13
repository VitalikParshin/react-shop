import * as React from "react";
import {Flex, Button, WhiteSpace} from "antd-mobile";
import {Catalog, FlatPages} from "../../modules/layout/index";

const HomePage = () => {
  window.addEventListener('scroll', function(){console.log('hEllo')})
  return (
    <div>
      <Catalog />
      <WhiteSpace size="lg" />
      <FlatPages />
    </div>
  )
}

export default HomePage;
