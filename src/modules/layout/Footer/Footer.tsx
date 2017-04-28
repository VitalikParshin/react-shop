import * as React from "react";
import { Button } from "antd-mobile";
import { Link } from "react-router-dom";

class Footer extends React.Component<any,any> {
    render() {
        return (
            <div style={{
              position: "fixed",
              bottom: 0,
              background: "lightblue",
              width: "100%",
              textAlign: "center",
            }}>
              BuyBag 2017
            </div>
        )
    }
}

export default Footer;
