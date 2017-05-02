import * as React from "react";
import {Card, Button, Flex} from "antd-mobile";
import {Images} from "../../product/index";
import { Link } from "react-router-dom";

// <Images images={images}/>
const Filters = (props) => {
  const { id, name, titleImage, subProducts } = props;
  const subProduct = subProducts[0];
  const url = `/product/${id}`;
  return (
    <div style={{
      background: "#08c",
      position: "fixed",
      width: "100%",
      padding: 5,
    }}>
      <Flex justify="between">
        <Flex.Item><Button>Фильтры</Button></Flex.Item>
        <Flex.Item><Button>Фильтры</Button></Flex.Item>
      </Flex>
    </div>
  )
}

export default Filters;
