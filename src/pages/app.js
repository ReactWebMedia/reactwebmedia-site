import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { defaultSelector } from '../selectors';
import { ActionsTrigger } from '../triggers';


class App extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  static async fetchData(params, store, client) {
    const props = store.getState();

    if (!props.get('current_user').get('id')) {
      return;
    }

    const triggers = new ActionsTrigger(client, store.dispatch);
    await triggers.loadUserTags();
  }

  render() {
    return (
      <div className="page">
        {this.props.children}
      </div>
    )
  }
}

export default connect(defaultSelector)(App);
