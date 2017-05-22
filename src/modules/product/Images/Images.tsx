import * as React from "react";
import {Carousel, WhiteSpace, WingBlank, Flex} from "antd-mobile";
import { Image, scaleImageSize } from "../index";

interface ImagesProps {
  images: [any];
}

class Images extends React.Component<ImagesProps, any> {

  state = {
    data: ['', '', ''],
    initialHeight: 200,
  }
  render() {
    const { images } = this.props;
    const ratio = 1;
    const maxImageHeight = Math.max(
      ...images.map(img => scaleImageSize(img.width, img.height, ratio).height)
    );

    return (
      <WingBlank>
        <Carousel
          className="my-carousel"
          autoplay={false}
          infinite={false}
          selectedIndex={0}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
          style={{background: "white"}}
          // style={{
          //   display: "flex",
          //   background: "white",
          //   height: maxImageHeight,
          // }}
        >
          {this.props.images.map(image => (
            <Flex
                justify="center"
                align="center"
                style={{
                  height: window.innerHeight * 0.8,
                }}
            >
              <img
                height={scaleImageSize(image.width, image.height).height}
                src={image.src}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                  this.setState({
                    initialHeight: null,
                  });
                }}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Flex>
          ))}
        </Carousel>
      </WingBlank>
    )
  }
}

export default Images;
