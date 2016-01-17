import React, { PropTypes } from 'react';

import Message from './message';


export default class Messages extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.string
    })).isRequired,
    removeMessage: PropTypes.func.isRequired
  };

  render() {
    if (this.props.messages.length == 0) {
      return <script/>;
    }

    let msgTags = this.props.messages.map((msg, i) => {
      let params = { i, message: msg.message, type: msg.type, removeMessage: this.props.removeMessage };
      return <Message {...params} />;
    });

    return (
      <div className="layout layout__space layout-align_center">
        <div className="message__group">{msgTags}</div>
      </div>
    );
  }
}
