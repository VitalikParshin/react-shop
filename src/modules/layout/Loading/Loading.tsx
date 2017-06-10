import { Button, Icon, List, WingBlank } from "antd-mobile";
import * as React from "react";

const Loading = () => {
  return (
    <div style={{position: "fixed", top: "45%", left: "45%"}}>
      <Icon type="loading" size="lg"/>
    </div>
  );
};

export default Loading;
