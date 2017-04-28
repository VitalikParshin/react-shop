import * as React from "react";
import { Button, NoticeBar } from "antd-mobile";
import { Link } from "react-router-dom";

class Header extends React.Component<any,any> {
    render() {
        return (
          <div>
            <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 0.15rem' } }}>
              % СКИДКИ ТОЛЬКО ДО ДНЯ ЗАЩИТНИКА ДЕТЕЙ %
            </NoticeBar>
          </div>            
        )
    }
}

export default Header;
