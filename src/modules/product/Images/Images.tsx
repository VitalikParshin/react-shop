import * as React from "react";
import { Carousel, WhiteSpace, WingBlank } from "antd-mobile";

export const scaleImageSize = (width, height) => {
  const ratio = window.innerWidth / 2.4 / 360;
  return {
    width: width * ratio,
    height: height * ratio,
  }
}

interface ImagesProps {
  images: [any];
}

class Images extends React.Component<ImagesProps, any> {

  state = {
    data: ['', '', ''],
    initialHeight: 200,
  }

  render() {
    return (
      <WingBlank>
        <Carousel
          className="my-carousel" autoplay={false} infinite selectedIndex={0}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
          style={{
            background: "white",
            // padding:"1rem",
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
