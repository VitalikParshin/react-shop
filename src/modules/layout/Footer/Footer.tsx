import { Button } from "antd-mobile";
import * as React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component<any, any> {
    public render() {
        return (
            <div style={{
              background: "lightblue",
              bottom: 0,
              position: "fixed",
              textAlign: "center",
              width: "100%",
            }}>
              BuyBag 2017
            </div>
        );
    }
}

export default Footer;
