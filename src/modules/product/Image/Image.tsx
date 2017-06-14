import {Carousel, Flex, WhiteSpace, WingBlank} from "antd-mobile";
import * as React from "react";

export const scaleImageSize = (width, height, ratio = 1) => {
  ratio = ratio || window.innerWidth / 2.4 / 360;
  return {
    height: height * ratio,
    width: width * ratio,
  };
};

interface ImageProps {
  src: string;
  width: number;
  height: number;
  isTitle: boolean;
  divHeight: number;
}

class Image extends React.Component<ImageProps, null> {
  public render() {
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
            height: "100%",
            objectFit: "contain",
            width: "100%",
          }}
        />
      </Flex>
    );
  }
}

export default Image;
