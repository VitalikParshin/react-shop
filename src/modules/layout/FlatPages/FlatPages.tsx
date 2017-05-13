import * as React from "react";

import { compose, gql, graphql } from "react-apollo";

import { List, WhiteSpace, WingBlank, Button, Modal } from "antd-mobile";
import { Loading } from "../index";

const FLATPAGES_QUERY = gql `
  query flatpages{
    flatPages{
      id
      name
      url
      content
      templateName
      metaTitle
      metaDescription
      metaKeywords
      dateUpdated
      isActive
      image
    }
  }
`

function createMarkup(html) {
  return {__html: html};
}

class FlatPages extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      modal6: false,
      modal7: false,
      modal8: false,
      modal9: false,
      modal10: false,
      modal11: false,
    }
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }


  render() {
    const { data }  = this.props;
    const {loading, flatPages} = data;

    if (loading === true) {
      return <Loading/>;
    }
    return (
      <div>
        {flatPages.slice(1).map(page => (
            <div style={{marginLeft: "10px"}}>
              <List>
                <Button onClick={this.showModal('modal1')}>{page.name}</Button>
                <Modal
                  // title="Title Page"
                  transparent
                  maskClosable={false}
                  visible={this.state.modal1}
                  onClose={this.onClose('modal1')}
                  footer={[{ text: 'Назад', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                >
                  <div dangerouslySetInnerHTML={createMarkup(page.content)}></div>
                </Modal>
              </List>
              <WhiteSpace />
            </div>
        ))}
      </div>
    )
  }
}

export default graphql(FLATPAGES_QUERY)(FlatPages);
