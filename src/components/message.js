import React, { PropTypes } from 'react';

import bem from '../utils/bemClassNames';
import messageType from '../consts/messageTypeConstants';


export default class Message extends React.Component {
  static propTypes = {
    i: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    message: PropTypes.string.isRequired,
    removeMessage: PropTypes.func.isRequired,
    type: PropTypes.string
  };

  closeHandler = () => {
    this.props.removeMessage(this.props.i);
  };

  render() {
    let {type, message, i} = this.props;

    let cn = bem.makeClassName({
      block: 'message',
      modifiers: {
        error: () => (type == messageType.ERROR)
      }
    });

    return (
      <div className={cn} key={i}>
        <span className="message__close action fa fa-times" onClick={this.closeHandler} />
        <div className="message__body">
          {message}
        </div>
      </div>
    );
  }
}
