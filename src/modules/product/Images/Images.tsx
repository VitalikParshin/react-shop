import * as React from "react";
import { Carousel, WhiteSpace, WingBlank } from "antd-mobile";
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
      ...images.map(img => scaleImageSize(img.width, img.height).height)
    );

    return (
      <WingBlank>
        <Carousel
          className="my-carousel"
          autoplay={false}
          infinite selectedIndex={0}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
          style={{
            background: "white",
            height: maxImageHeight,
          }}
        >
          {this.props.images.map(image => (
            <img
              height={scaleImageSize(image.width, image.height).height}
              src={image.src}
              onLoad={() => {
                window.dispatchEvent(new Event('resize'));
                this.setState({
                  initialHeight: null,
                });
              }}
            />
          ))}
        </Carousel>
      </WingBlank>
    )
  }
}

export default Images;
