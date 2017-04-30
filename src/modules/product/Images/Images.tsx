import * as React from "react";
import { Carousel, WhiteSpace, WingBlank } from "antd-mobile";

const imageUrl = (image) => {
  return `http://buybag.com.ua/media/${image.image}`;
}

class Images extends React.Component<any, any> {
  
  state = {
    data: ['', '', ''],
    initialHeight: 200,
  }

  render() {
    return (
      <WingBlank>
        <Carousel
          className="my-carousel" autoplay={false} infinite selectedIndex={1}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
          style={{
            background: "white", 
            // padding:"1rem",
          }}
        >    
          {this.props.images.map(image => (
            <img 
              src={imageUrl(image)}
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
