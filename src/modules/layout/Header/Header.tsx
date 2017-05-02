import * as React from "react";
import { List, Drawer, WingBlank, Flex, Button, NoticeBar, NavBar, Icon, Card } from "antd-mobile";
import { Link } from  "react-router-dom";



class Header extends React.Component<any,any> {
  state = {
    open: false,
    position: 'left',
  }

  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  }

  render() {
    const drawerProps = {

    };
    const sidebar = (<List>
      {[...Array(20).keys()].map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            multipleLine
          >Category</List.Item>);
        }
        return (<List.Item key={index}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        >Category{index}</List.Item>);
      })}
    </List>);

    return (
      <div style={{
        background: "#08c",
        position: "fixed",
        width: "100%",
        padding: 5,
        zIndex: 100,
      }}>

      <Drawer
        dragHandleStyle={{ display: 'none' }}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebar={sidebar}
        open={this.state.open}
        position="left"
        onOpenChange={this.onOpenChange}
        // enableDragHandle={true}
      />

        <Flex justify="between">
          <Flex.Item><Link to="/"><span style={{color: "white"}}>Home</span></Link></Flex.Item>
          <Flex.Item onClick={this.onOpenChange}><Icon style={{color:"white"}} type="ellipsis"/></Flex.Item>
        </Flex>
      </div>
    )
  }
}

            // <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 0.15rem' } }}>
            //   % СКИДКИ ТОЛЬКО ДО ДНЯ ЗАЩИТНИКА ДЕТЕЙ %
            // </NoticeBar>

export default Header;
