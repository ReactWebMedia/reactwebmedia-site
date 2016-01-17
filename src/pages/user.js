import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import NotFound from './not-found';
import BaseUserPage from './base/user';

import {API_HOST} from '../config';
import ApiClient from '../api/client'
import { addUser, setUserPosts } from '../actions';
import { ActionsTrigger } from '../triggers';
import { defaultSelector } from '../selectors';


class UserPage extends React.Component {
  static displayName = 'UserPage';

  static async fetchData(params, store, client) {
    let userInfo = await client.userInfo(params.username);
    let userPosts = client.userPosts(params.username);

    store.dispatch(addUser(userInfo));
    store.dispatch(setUserPosts(userInfo.id, await userPosts));
  }

  render () {
    let page_user = _.find(this.props.users, {username: this.props.params.username});
    const {
      following,
      followers
    } = this.props;

    if (_.isUndefined(page_user)) {
      return <script/>;  // not loaded yet
    }

    if (false === page_user) {
      return <NotFound/>
    }

    //console.info(this.props);

    let user_posts = this.props.user_posts[page_user.id];

    const client = new ApiClient(API_HOST);
    const triggers = new ActionsTrigger(client, this.props.dispatch);

    return (
      <BaseUserPage
        current_user={this.props.current_user}
        following={following}
        followers={followers}
        i_am_following={this.props.i_am_following}
        is_logged_in={this.props.is_logged_in}
        page_user={page_user}
        triggers={triggers}
      >
      </BaseUserPage>
    )
  }
}

export default connect(defaultSelector)(UserPage);
