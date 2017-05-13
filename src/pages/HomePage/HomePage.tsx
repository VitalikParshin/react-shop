import * as React from "react";
import { Flex, Button } from "antd-mobile";
import { Catalog, FlatPages } from "../../modules/layout/index";

const HomePage = () => {
  window.addEventListener('scroll', function(){console.log('hEllo')})
  return (
    <div>
      <Catalog />
      <FlatPages />
    </div>
  )
}

export default HomePage;
