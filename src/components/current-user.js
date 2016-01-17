import React from 'react'
import _ from 'lodash';

import User from './user';


export default class CurrentUser extends React.Component {
  render() {
    if (_.isUndefined(this.props.user)) {
      return <script/>;
    }

    return <User className="user_box-small" user={this.props.user} />;
  }
}
