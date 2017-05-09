import * as React from "react";
import { Flex, Button } from "antd-mobile";
import { Catalog } from "../../modules/layout/index";

const HomePage = () => {
  window.addEventListener('scroll', function(){console.log('hEllo')})
  return (
    <div>
      <Catalog/>
    </div>
  )
}

export default HomePage;
