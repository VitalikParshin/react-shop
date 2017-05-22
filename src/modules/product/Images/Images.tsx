import * as React from "react";
import {Carousel, WhiteSpace, WingBlank, Flex} from "antd-mobile";
import {scaleImageSize} from "../Image/Image";

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
    const maxImageHeight = Math.max(
      ...images.map(img => scaleImageSize(img.width, img.height, 1.5).height)
    );

    return (
      <Carousel
        className="my-carousel"
        autoplay={false}
        infinite
        selectedIndex={0}
        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange={index => console.log('slide to', index)}
        style={{
          background: "white",
          height: maxImageHeight + 80,
          padding: "40px 0"
        }}
      >
        {this.props.images.map(image => (
          <Flex
              justify="center"
              align="center"
              style={{
                height: maxImageHeight,
              }}
          >
            <img
              src={image.src}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
              onLoad={() => {
                window.dispatchEvent(new Event('resize'));
                this.setState({
                  initialHeight: null,
                });
              }}
            />
          </Flex>
        ))}
      </Carousel>
    )
  }
}

export default Images;
