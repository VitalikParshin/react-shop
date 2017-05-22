import * as React from "react";
import {Carousel, WhiteSpace, WingBlank, Flex} from "antd-mobile";

export const scaleImageSize = (width, height, ratio=1) => {
  ratio = ratio || window.innerWidth / 2.4 / 360;
  return {
    width: width * ratio,
    height: height * ratio,
  }
}

interface ImageProps {
  src: string;
  width: number;
  height: number;
  isTitle: boolean;
  divHeight: number;
}

class Image extends React.Component<ImageProps, any> {
  render() {
    const { divHeight, width, height, src, isTitle } = this.props;
    return (
      <Flex
          justify="center"
          align="center"
          style={{height: divHeight}}
      >
        <img
          src={src}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
        />
      </Flex>
    )
  }
}

export default Image;
