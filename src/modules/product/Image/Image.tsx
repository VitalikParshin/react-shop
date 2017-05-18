import * as React from "react";
import { Carousel, WhiteSpace, WingBlank } from "antd-mobile";

export const scaleImageSize = (width, height) => {
  const ratio = window.innerWidth / 2.4 / 360;
  return {
    width: width * ratio,
    height: height * ratio,
  }
}

interface ImageProps {
  src: string;
  width: number;
  height: number;
  isTitle: boolean
}

class Image extends React.Component<ImageProps, any> {
  render() {
    const { width, height, src, isTitle } = this.props;
    return (
      <img
        height={scaleImageSize(width, height).height}
        src={src}
      />
    )
  }
}

export default Image;
