import * as React from "react";
import {Button, NoticeBar, NavBar, Icon} from "antd-mobile";
import {Link} from "react-router-dom";

class Header extends React.Component<any,any> {
    render() {
        return (
          <div>

            <div>
              <NavBar leftContent="back" mode="light" onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                  <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
                  <Icon key="1" type="ellipsis" />,
                ]}
              >NavBar</NavBar>
            </div>

            <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 0.15rem' } }}>
              % СКИДКИ ТОЛЬКО ДО ДНЯ ЗАЩИТНИКА ДЕТЕЙ %
            </NoticeBar>
          </div>            
        )
    }
}

export default Header;
