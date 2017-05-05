import * as React from "react";
import { Icon, WingBlank, List, Button } from "antd-mobile";

const Loading = () => {
  return (
    <div style={{position: "fixed", top:"45%", left:"45%"}}>
      <Icon type="loading" size="lg"/>
    </div>
  )
}

export default Loading;
