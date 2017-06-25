import {Carousel, Flex, WhiteSpace, WingBlank} from "antd-mobile";
import * as React from "react";
import {scaleImageSize} from "../Image/Image";
import {IImage} from "../model";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

interface IImagesProps {
  images: [IImage];
}

interface IImagesState {
  // data: [string];
  initialHeight: any;
}

class Images extends React.Component<IImagesProps, IImagesState> {

  public state = {
    data: ["", "", ""],
    initialHeight: 200,
  };

  public render() {
    const { images } = this.props;
    const maxImageHeight = Math.max(
      ...images.map((img) => scaleImageSize(img.width, img.height, 1.5).height),
    );

    return (
      <Carousel
        // className="my-carousel"
        className={styles.carousel}
        autoplay={false}
        infinite
        selectedIndex={0}
        // tslint:disable-next-line:no-console
        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        // tslint:disable-next-line:no-console
        afterChange={(index) => console.log("slide to", index)}
        style={{
          height: maxImageHeight + 80,
        }}
      >
        {this.props.images.map((image, i) => (
          <Flex
              key={i}
              justify="center"
              align="center"
              style={{
                height: maxImageHeight,
              }}
          >
            <img
                className={styles.image}
                src={image.src}
                onLoad={() => {
                  window.dispatchEvent(new Event("resize"));
                  this.setState({
                    initialHeight: null,
                  });
                }}
            />
          </Flex>
        ))}
      </Carousel>
    );
  }
}

export default Images;
